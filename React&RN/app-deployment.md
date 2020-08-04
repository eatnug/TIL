배포하기에 대해 정리해보자.

## iOS

iOS 배포에서 가장 까다로웠던 부분은 인증서와 프로파일이었다.

우선 가장 기본적으로 개발용, 배포용 인증서를 발급받는다.

keychain access - certificate assistant - request a certificate ~~ 를 선택해서 인증서 발급을 요청하는데, 이때 애플 개발자 프로그램에 등록된 이메일 계정과 이름을 사용했고, 요청서를 이메일로 CA에 보내는 대신, 로컬 드라이브에 저장한다.

이제 애플 개발자 센터에서 인증서를 발급하는데, 먼저 인증서의 종류를 선택한다. 내가 사용한건 3가지, iOS 개발인증서, iOS 배포인증서, Apple Push Services 인증서였다. 개발, 배포 인증서는 그냥 말 그대로 개발, 배포 하기 위한 인증서였기 때문에 인증서 종률르 선택하고 바로 요청서를 업로드하면 되지만, APS 인증서는 어떤 앱에 푸시알림 서비스를 사용할 것 인지 지정하기 때문에, 인증서를 요청하기 전에 먼저 identifier를 등록해두자.

그 후 앱 빌드에 사용할 프로비져닝 프로파일을 만드는데, 먼저 인증서 처럼 타입을 정한다.그 후 이 프로파일을 사용해 빌드할 앱 아이디를 지정하고 발급받는다.

이들을 다운받아서 키 체인에 등록하면 Xcode에서 앱을 빌드하는데에 사용할 수 있다.

이때 이 인증서와, 프로파일, 앱 아이디 등은 모두 다 연결되어있어서, Xcode에서 무언가 기능을 추가한다거나 하면 인증서과 프로파일 쪽에서 같은 기능을 커버하도록 수정되어야 하는 것 같다.

## android

안드로이드는 빌드 스크립트를 수정하는 과정이 있었다. [dev-yakuza님의 글](https://dev-yakuza.github.io/ko/react-native/android-running-on-device/)과 [react native 공식 문서](https://reactnative.dev/docs/signed-apk-android)를 적절히 따라했다.

우선 keytool로 업로드 키를 생성했다.

```bash
#  ./android/app

keytool -genkeypair -v -keystore my-upload-key.keystore -alias upload-key -keyalg RSA -keysize 2048 -validity 10000
```

그 후 빌드 세팅에 내 업로드 키를 설정해줬다.

```properties
<!-- android/gradle.properties -->
MYAPP_RELEASE_STORE_FILE=my-upload-key.keystore
MYAPP_RELEASE_KEY_ALIAS=upload-key
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

다음으로 빌드 스크립트를 수정했다.

```gradle
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

마지막으로 빌드 해줬다.

```bash
cd android
./gradlew bundleRelease
```

빌드 된 파일은 `android/app/build/outputs/bundle/release/`에 생성된다.
