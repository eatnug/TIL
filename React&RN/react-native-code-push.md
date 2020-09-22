# codepush란?

codepush는 react native 혹은 cordova 로 개발한 앱을 번거로운 심사과정 없이 바로 업데이트 할 수 있도록 해주는 서비스이다. 네이티브 코드라는 막으로 감싸져있는 내부의 코드 번들을 원격 저장소에 업로드 해두고, 로컬 디바이스의 앱 번들과 비교해 차이가 있으면 다시 다운로드 받아 업데이트 하는 형태인 듯 하다.

현재 ios (7+), android (4.1+), windows의 운영체제를 지원한다.

react native 기준으로 Image, Maview.Marker, PrgoressViewIOS 등 특정 컴포넌트들은 소스가 되는 이미지를 codepush 서비스로 업데이트 할 수 있는 반면 SliderIOS나 Video는 불가능하다고 한다.

허나 4달 정도 직접 사용해 본 결과 자바스크립트 번들을 통째로 업데이트 할 수 있기 때문에 네이티브 코드를 추가로 작성한다거나 하는 부분이 아니면 업데이트에서 제한을 거의 느낄 수 없었다.

## 세팅하기

### 1. AppCenter CLI 설치하기

```bash
yarn global add appcenter-cli

or

npm i -g appcenter-cli
```

### 2. Appcenter에 앱과 배포트랙 등록하기

우선 `appcenter-cli`로 로그인을 한다.

```bash
appcenter login # 웹 브라우저가 켜지면 앱센터에 로그인해서 키를 복사한 후 커맨드라인에 붙여넣으면 된다.
```

이제 appcenter에 내 앱을 생성하고, 배포 트랙을 설정해야한다. 다음 작업들은 appcentr 대시보드에서도 할 수 있지만 귀찮으니 명령어로 해결하자.

```bash
# appname 과 os 부분을 본인 프로젝트에 맞게 수정하는 것 잊지말자.
appcenter apps create -d {appname} -o {os}(Android/iOS) -p React-Native
```

실제 프로젝트에서 사용할 떄는 `appname-ios, appname-android`로 앱 두개를 등록하고 관리하는 형태로 했다. 이제 각 앱마다 배포트랙을 생성해주자.

```bash
# 배포 트랙을 여러개로 설정해서 관리하는 경우도 있다고 하는데 아직 그렇게 복잡하게 해보지는 않았다.
# 만약 appcenter 대시보드를 이용하면 기본적으로 Staging 그리고 Production 트랙이 생성된다.
# 그리고 마지막에 볼 배포과정에서 트랙 이름을 생략하면 Staging으로 배포를 시도한다.
appcenter codepush deployment add -a {username/appname} {trackname}
```

이때 터미널에 배포 키가 보여진다. 나중에 설정에 사용해야하니 복사해두자. 혹시나 놓쳤다면 다음 명령어로 다시 확인할 수 있다.

```bash
appcenter codepush deployment list -a {username/appname} -k
```

### 3. 프로젝트에 codepush 설치하기

react native 프로젝트에 codepush 디펜던시를 추가한다.

```
yarn add react-native-code-push
```

#### iOS Setup

1. 디펜던시 설치

react native 프로젝트 루트 디렉토리 기준으로 다음 명령어로 네이티브 디펜던시 설치를 진행한다.

```bash
cd ios && pod install && cd ..
```

2. `AppDelegate.m` 수정

```obj-c
#import "AppDelegate.h"

#import <CodePush/CodePush.h> // codepush 헤더 추가

#import <React/RCTBridge.h>
...
```

3. source URL 수정하기

```obj-c
return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];    <!-- turn this into next line -->
return [CodePush bundleURL];
```

이때 `bundleURL`은 앱의 JSBundle이 `main.jsbundle`이라는 이름을 가지는 것을 기준으로 한다. 만약 아니라면 `bundleURLForResource:` 혹은 `bundleURLForResource:withExtension:`등을 호출해야한다.

특별한 경우가 아니라면 `sourceURLForBridge` 메소드가 다음과 같은 형태면 된다.

```obj-c
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    return [CodePush bundleURL];
  #endif
}
```

4. `Info.plist`에 배포 키 추가하기.

codepush 원격 저장소의 어떤앱에 접근할지 알려주기 위해 `Info.plist`에 아까 확인했던 codepush 배포키를 `CodePushDeploymentKey` 키의 값으로 추가해주자.

이 키는 `code-push deployment ls <appName> -k` 명령어로 다시 확인할 수 있다.

```plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  ...
	<key>CodePushDeploymentKey</key>
	<string>mydeploymentkey</string>
  ...
</plist>

```

5. HTTP 예외 도메인 설정 (iOS)

이부분이 좀 애매하다. 공식문서 읽어보고 찾아서 해야하는데 일단 지금 작업중인 프로젝트에서는 다음과 같은 상태이다.

```xml
<plist version="1.0">
  <dict>
  ...
  <key>CodePushDeploymentKey</key>
  <string>mydeploymentkey</string>
  ...
	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
		<key>NSExceptionDomains</key>
		<dict>
			<key>codepush.appcenter.ms</key>
			<dict>
				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
			<key>localhost</key>
			<dict>
				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
		</dict>
	</dict>
  ...
  </dict>
</plist>
```

#### Android 셋업

1. `android/app/build.gradle`에 `codepush.gradle`를 추가한다.

```Gradle
...
apply from: "../../node_modules/react-native/react.gradle"
apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
...
```

2. `MainApplication.java`를 업데이트한다.

```java
...
// 1. Import the plugin class.
import com.microsoft.codepush.react.CodePush;
public class MainApplication extends Application implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        ...
        // 2. Override the getJSBundleFile method in order to let
        // the CodePush runtime determine where to get the JS
        // bundle location from on each app start
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
    };
}
```

3. 배포키를 `strings.xml`에 추가한다.

아까 확인했던 그 배포키이다.

```xml
 <resources>
     <string name="app_name">AppName</string>
     <string moduleConfig="true" name="CodePushDeploymentKey">mydeploymentkey</string>
 </resources>
```

### 4. 실제로 프로젝트에 codepush 적용하기

codepush 세팅이 끝났으니, 실제로 내 앱이 자바스크립트 번들을 원격 저장소에서 받아와서 업데이트 할 수 있도록 코드를 작성해야한다. 여러가지 옵션을 설정할 수 있지만 가장 간단한 형태만 알아보자.

```jsx
// 최상위 컴포넌트라고 가정하자.
import React from 'react'
import codePush from 'react-native-code-push'

const App = () => (
  <AwesomeWrapper>
    <AwesomeContent />
  </AwesomeWrapper>
)

// 각종 codepush 관련 옵션을 설정하고
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
}

// 최상위 컴포넌트를 codepush 래퍼로 감싸서 export 한 다음 컴포넌트 등록을 할 수 있게 하자.
export default codepush(codePushOptions)(App)
```

위의 예제는 버젼 체크를 하는 케이스와 업데이트 하는 형태를 고정해두는 형태이지만, `codepush.sync` 함수로 동적으로 트리거 할수도 있다. 자세한 내용은 [codepush api](https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md)를 확인해보자.

### 5. 배포하기

앱이 세팅되고, appcenter 로그인이 된 상태에서 다음 명령어로 배포할 수 있다. 당연한 얘기일 수 있으나, react native 프로젝트 루트 디렉토리에서 진행해야한다. `package.json` 을 읽어서 작업을 수행하기 때문.

```
appcenter codepush release-react -a {username/appname} -d {trackname}
```
