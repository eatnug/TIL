코드푸시는 리액트 네이티브로 개발한 앱을 번거로운 심사과정 없이 바로 업데이트 하고, 만약을 대비해 롤백도 할 수 있게 해주는 서비스이다. 네이티브 코드를 건드리는 작업 없이 자바스크립트 코드만 수정한다면 코드푸시 서비스를 통해 업데이트를 제공할 수 있다.

# 지원 범위

ios (7+), android (4.1+), windows 지원한다.

## 지원하는 컴포넌트

Image, Maview.Marker, PrgoressViewIOS 등 특정 컴포넌트들은 소스가 되는 이미지를 코드푸시 서비스로 업데이트 할 수 있다. 반면에 SliderIOS나 Video는 불가능하다.

# 시작하기

## 1. Install App Center CLI

```
yarn global add appcenter-cli
```

## 2. Appcenter에 앱과 배포트랙 등록하기

1. `appcenter login`으로 로그인한다.
1. `appcenter apps create -d {appname} -o {os}(Android/iOS) -p React-Native`로  앱을 생성한다. `appname`을 `-ios/-android`로 나누어서 앱 두개로 관리하는 형태로 했다.
1. `appcenter codepush deployment add -a {username/appname} {trackname}` 으로 앱에 대한 배포트랙을 생성한다. 이때 터미널에 배포 키가 보여진다.
1. 만약 배포키를 놓쳤을 경우 `appcenter codepush deployment list -a {username/appname} -k` 으로 확인할 수 있다.

## 3. CodePush-ify your app

```
yarn add react-native-code-push
```
### iOS Setup

1. 디펜던시 설치

   `pod install`

2. `AppDelegate.m` 수정

```obj-c
#import <CodePush/CodePush.h>
```

3. source URL 수정하기

```obj-c
return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];    <!-- turn this into next line -->
return [CodePush bundleURL];
```

이때 `bundleURL`은 앱의 JSBundle이 `main.jsbundle`이라는 이름을 가지는 것을 기준으로 한다. 만약 아니라면 `bundleURLForResource:` 혹은 `bundleURLForResource:withExtension:`등을 호출해야한다.

보통 코드푸시는 release 빌드에서 JS 번들의 위치를 파악하기 위해 쓰니까 `DEBUG` pre-processor 매크로를 사용해서 동적으로 packger server와 code-push를 왔다갔다 하는걸 추천한다. ( ?? )

`sourceURLForBridge` 메소드는 다음과 같을 것이다.

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

3. `Info.plist`에 배포 키 추가하기.

코드푸시의 어떤 배포에 접근할지 앱에게 알려주기 위해 `Info.plist`에 `CodePushDeploymentKey`를 추가해주자.

이 키는 `code-push deployment ls <appName> -k` 명령어로 확인할 수 있다.

#### HTTP 예외 도메인 설정 (iOS)

코드푸시는 아래의 3 도메인에 HTTPS 요청을 전송합니다.

- codepush.appcenter.ms
- codepush.blob.core.windows.net
- codepushupdates.azureedge.net

기본 HTTP 보안 설정을 바꾸고싶다면 다음과 비슷하게 하면 되는데, 먼저 애플의 공식문서부터 읽어보세요.

```xml
<plist version="1.0">
  <dict>
    <!-- ...other configs... -->

    <key>NSAppTransportSecurity</key>
    <dict>
      <key>NSExceptionDomains</key>
      <dict>
        <key>codepush.appcenter.ms</key>
        <dict><!-- read the ATS Apple Docs for available options --></dict>
      </dict>
    </dict>

    <!-- ...other configs... -->
  </dict>
</plist>
```


### Android 셋업

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

```xml
 <resources>
     <string name="app_name">AppName</string>
     <string moduleConfig="true" name="CodePushDeploymentKey">DeploymentKey</string>
 </resources>
```


