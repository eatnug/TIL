# 안드로이드 기본 개념  - 앱 기초

## 첫 앱 빌드하기

### 프로젝트 시작하기

#### 시작하기 전에

첫 프로젝트 시작 전에 알아야할 두가지 기본 개념이 있다.

앱은 여러 진입점을 제공하고, 다양한 기기에 맞게 변경된다. 사용자가 앱 아이콘을 눌러서 들어오거나 알림을 누르거나 등등 여러 케이스에 맞는 진입점을 구현할 수 있다.  또 각 기기마다의 화면 그리고 하드웨어의 특징 등에 따라 다른 형태를 제공한다.

#### 프로젝트 만들기

안드로이드 스튜디오에서 새 프로젝트를 만든다.

- Name은 프로젝트의 이름이다.
- Package name은 말 그대로 패키지의 이름이다. 코드레벨에서 사용된다. 반면, 플레이스토어에서 앱을 구별하는 유니크한 값은 어플리케이션 ID으로 원래 서로 독립적인 값인데, 안드로이드 스튜디오에서 프로젝트를 시작할때 어플리케이션 ID를 패키지네임으로 세팅해준다.
-  Minimum SDK는 지원할 가장 낮은 버젼의 안드로이드 SDK 버젼을 설정합니다.

프로젝트 파일들을 살펴보자.

- `app/java/com.some.name/MainActivity`: 기본 액티비티로 앱의 진입점이다. 앱을 빌드하고 실행하면 시스템에서 이 `Activity`의 인스턴스를 실행하고 레이아웃을 로드한다.
- `app/res/layout/activity_main.xml`: 액티비티의 UI 레이아웃을 정의한다.
- `app/manifests/AndroidManifest.xml`: 앱의 기본 특성을 설명하고, 각 구성 요소를 정의한다.
- `build.gradle`: 빌드파일이다. 프로젝트용 빌드파일과 모듈용 빌드파일이 각각 존재한다.

### 간단한 UI

[이 문서]('https://github.com/eaTnuG/TIL/blob/master/Android/kotlin-android-basics-UI.md')를 참고하자.

### 다른 액티비티 시작

액티비티를 다뤄보자. 

#### button onClick method

우선 UI에 버튼을 추가하고 onClick 함수를 추가해보자. 이때 `MainActivity`에 메소드를 추가할 때 몇가지 지켜야할 부분이 있다. __public access__가 가능해야하고, __void 혹은 unit의 리턴 타입__을 가져야하며 __유일한 매개변수로 View__ 객체를 가져야 한다.

#### Intent build

`Intent` 는 개별 구성요소 (ex: 두개의 활동) 간에 런타임 바인딩을 제공하는 객체이다. 

`Intent` 생성자는 두 매개변수 `Context`와 `Class`를 받는다. 지금의 컨텍스트와 이를 받을 타겟 액티비티를 순서대로 넘겨주면 된다. 그리고 이 `Intent`  인스턴스를 인자로 `startActivity`를 호출하면 해당 액티비티의 인트턴스를 만들어서 로드한다.

이제 `Intent`를 넘겨받은 액티비티의 `onCreate`에서 `intent` 변수를 사용하면 알아서 이 액티비티를 시작시킨 `intent`를 읽어와서 사용할 수 있다.

#### 상향 탐색 추가

기본 액티비티가 아닌 경우에 앱의 계층구조를 알려줘야한다. 그래야 뒤로가기 버튼이 생성된다. `AndroidManifest.xml` 에서 자식 액티비티의 속성값으로 추가해줄 수 있다.
```xml
<activity android:name=".ChildActivity"
              android:parentActivityName=".MainActivity">
        <!-- The meta-data tag is required if you support API level 15 and lower -->
        <meta-data
            android:name="android.support.PARENT_ACTIVITY"
            android:value=".MainActivity" />
    </activity>
    
```

