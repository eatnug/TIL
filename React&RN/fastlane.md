## fastlane으로 앱 배포 자동화하기.

fastlane은 앱을 빌드하고 앱스토어, 플레이스토어에 빌드된 파일을 업로드 하고 배포하기 까지의 과정을 자동화 시켜주는 도구이다. fastlane을 이용해 react native 앱 배포를 자동화 하는 과정을 알아보자.

### 세팅하기

#### android

안드로이드 프로젝트를 세팅하기 위해서 미리 필요한 것들은 다음과 같다. 

- 구글 플레이 콘솔 어드민 계정과 로그인 정보가 필요하다. ( ex) dev@pilltong.me )
- 구글 플레이 콘솔에 앱을 등록해야 한다. 
- 앱의 Package Name을 알아둬야 한다.
- [Google Credential](https://docs.fastlane.tools/getting-started/android/setup/#collect-your-google-credentials)을 얻어야 한다.

이제 react native 프로젝트에서 안드로이드 쪽 디렉토리에서 fastlane을 시작하면 된다. 

```bash
cd android
fastlane init
```

fastlane이 필요한 정보들을 물어볼 것이다.

- package name => com.~~~.~~~
- json secret 파일의 경로 => secret.json
- Download existing metadata and setup metadata management? => y

이 과정이 끝나면 android 디렉토리에 fastlane 폴더가 생성된다. `Appfile`은 package name이라던가 각종 설정 관련된 값을 저장하는 파일이고, `Fastfile`은 앱을 빌드하고, 배포하는 작업을 지정하는 파일이다.

#### ios

ios 프로젝트에 fastlane을 세팅할 때 필요한 사항들은 다음과 같다.

- Bundle Identifier를 알고있어야 한다.
- 어드민 유저의 애플 ID와 로그인 정보가 필요하다. ( ex) dev@pilltong.me )
- 앱 아이콘이 만들어져 있어야 한다?

이제 Xcode에서 설정을 수정해주어야 한다.

- `Signing & Capabilities` 탭의 `Signing` 섹션에서 `Automatically manage signing` 을 비활성화 시킨다.
- `Build Settings` 탭에서 `Code Signing Identity.Debug` 를 `Don't Code Sign`으로 설정하고, `Code Signing Identity.Release` 를 `iOS Distribution`으로 설정한다.

준비는 끝났고 이제 ios 디렉토리에서 fastlane을 세팅하면 된다.

```bash
cd ios
fastlane init
```

마찬가지로 fastlane이 필요한 정보들을 물어본다.

- What would you like to use fastlane for? => 테스트플라이트 배포를 목표로 하기 때문에 2를 선택
- Select Scheme => -tvOS가 없는 스키마 선택
- Apple ID Username, Password => 아까 준비했던 로그인 정보

ios 디렉토리에 fastlane 폴더가 생성된다. 안드로이드와 마찬가지로 `Appfile`은 package name이라던가 각종 설정 관련된 값을 저장하는 파일이고, `Fastfile`은 앱을 빌드하고, 배포하는 작업을 지정하는 파일이다.

### 앱 빌드하고 배포하기

배포하는 과정은 우선 안드로이드만 먼저 알아보자. 

앱 배포 자동화는 앱을 빌드하고 안드로이드 기준 내부 테스트, ios 기준 테스트플라이트 등록 까지만 진행한다. 이후에 앱을 테스트해보고 실제 스토어에 등록하는 과정은 버튼 몇번이면 끝나기도 하고, 완전히 실제 스토어로 등록까지 자동적으로 배포되는 것 보단 한번 걸러주는 스텝이 필요하다고 판단했다.

> .env
```env
SECRET_JSON_PATH = "json file directory"
PACKAGE_NAME = "package name"
SLACK_URL = "slack web hook url"
```

`.env` 파일에 secret json 파일 디렉토리, 패키지 네임, 알림을 받을 슬랙 채널 주소를 설정해준다.

> Appfile
```ruby
json_key_file(ENV["SECRET_JSON_PATH"]) # Path to the json secret file - Follow https://docs.fastlane.tools/actions/supply/#setup to get one
package_name(ENV["PACKAGE_NAME"]) # e.g. com.krausefx.app
```

json 파일과 패키지 네임을 `.env` 파일에서 읽어온다.

> Fastfile
```ruby
default_platform(:android)

platform :android do
  desc "deploy new version to internal track"
  lane :beta do |options|
    begin # validate version info
      versionName = google_play_track_release_names(
        package_name: ENV["PACKAGE_NAME"],
        json_key: ENV["SECRET_JSON_PATH"],
        track: 'internal'
      )[0]

      versionCode = google_play_track_version_codes(
        package_name: ENV["PACKAGE_NAME"],
        json_key: ENV["SECRET_JSON_PATH"],
        track: 'internal'
      )[0].to_i

      if options[:version] == nil
        raise "버젼을 입력하세요."
      elsif Gem::Version.new(options[:version]) < Gem::Version.new(versionName) 
        raise "현재 업로드 된 버젼보다 낮은 버젼은 사용할 수 없습니다."
      end

    rescue => exception
      puts "ERROR #{exception.message}"
      raise "ERROR #{exception.message}"
    end

    begin # build and upload to playstore
    slack(
      slack_url: ENV["SLACK_URL"],
      message: "%s 버젼 내부 테스트 배포를 시작합니다." % options[:version] 
    )
    
    gradle( task:"clean" )

    android_set_version_name(version_name: options[:version])
    android_set_version_code(version_code: versionCode + 1)
    
    gradle( task: "bundle", build_type: "Release" )

    upload_to_play_store( track: 'internal' )

    slack(
      slack_url: ENV["SLACK_URL"],
      message: "%s 버젼 내부 테스트로 배포가 완료되었습니다." % options[:version]
    )

    rescue => exception
      slack(
        slack_url: ENV["SLACK_URL"],
        message: "ERROR] #{exception.message}",
        success: false
      )
    end
  end
end
```

간단히 설명하자면

- 새로 배포하려는 버젼 코드, 버젼 네임을 현재 플레이스토어에 올라가 있는 정보와 비교한다
- 문제가 없으면 빌드하고 테스트 버젼으로 배포한다.
- 슬랙으로 알려준다.

이렇게 파일을 수정하고 터미널에서 다음 명령어를 실행하면 배포가 완료된다.

```bash
fastlane beta version:2.3.0
```

### ios에서 코드사이닝 하기

ios 쪽에서는 한가지 더 신경써야할 문제가 있는데, 바로 코드 사이닝이다. fastlane에서 제시하는 match를 사용해서 팀원들 간에 인증서와 프로파일을 공유해보기로 했다.

막상 해보니 별 것 없었다.

우선 match 를 시작한다.
```bash
fastlane match init

# 저장형태를 물어본다. git을 선택했다.
# github repository url 을 물어본다.
```

인증서와 프로파일을 생성한다.

```bash
# 배포용 이므로 appstore 타입을 발급받는다.
fastlane match appstore

# 애플 개발자로 등록된 애플 계정의 username을 입려한다.

# 애플이 로그인에 성공하면 사인할 앱의 bundle identifier 를 입력한다. 

# 애플 계정의 username을 입력한다.
```

인증서와 프로파일이 생성되었으면 이제 배포를 위한 fastfile을 작성한다.

> .env
```
IDENTIFIER = ""
APPLE_ID = ""
ITC_TEAM_ID = ""
TEAM_ID = ""
PROJECT = ""
FASTLANE_USER = ""
FASTLANE_PASSWORD = ""
FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD = ""
SLACK_URL = ""
GIR_URL = ""
```

> Appfile

```ruby
app_identifier(ENV["IDENTIFIER"]) # The bundle identifier of your app
apple_id(ENV["APPLE_ID"]) # Your Apple email address

itc_team_id(ENV["ITC_TEAM_ID"]) # App Store Connect Team ID
team_id(ENV["TEAM_ID"]) # Developer Portal Team ID
```

> Fastfile

```ruby
default_platform(:ios)

platform :ios do
  desc "Push a new beta build to TestFlight"
  lane :beta do |options|
    begin # validate version info
      latest_testflight_build_number
      buildNumber = lane_context[SharedValues::LATEST_TESTFLIGHT_BUILD_NUMBER]
      version = lane_context[SharedValues::LATEST_TESTFLIGHT_VERSION]

      if options[:version] == nil
        raise "버전을 입력하세요."
      elsif Gem::Version.new(options[:version]) < Gem::Version.new(version) 
        raise "현재 업로드 된 버젼보다 낮은 버전은 사용할 수 없습니다."
      end

    rescue => exception
      puts "ERROR #{exception.message}"
      next
    end

    begin # build and upload to testflight
      slack(
        slack_url: ENV["SLACK_URL"],
        message: "#{options[:version]} 버전 테스트플라이트 배포를 시작합니다."
      )      

      match(type: "appstore", git_url: ENV["GIT_URL"])
      increment_build_number(xcodeproj: "#{ENV["PROJECT"]}.xcodeproj", build_number: buildNumber + 1)

      build_app(workspace: "#{ENV["PROJECT"]}.xcworkspace", scheme: ENV["PROJECT"], skip_archive: true)

      upload_to_testflight

      slack(
        slack_url: ENV["SLACK_URL"],
        message: "#{options[:version]} 버전 테스트플라이트 배포가 완료되었습니다." 
      )
    rescue => exception
      slack(
        slack_url: ENV["SLACK_URL"],
        message: "ERROR] #{exception.message}",
        success: false
      )
    end
  end
end
```
### ref.

- [Distributing beta builds](https://thecodingmachine.github.io/react-native-boilerplate/docs/BetaBuild/)
- [Code Signing Guide for Teams](https://codesigning.guide/)
- [fastlane을 적용하여 팀원간 인증서 동기화 하기](https://littleshark.tistory.com/35)