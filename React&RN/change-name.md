리액트 네이티브 프로젝트에서 패키지 이름을 바꾸는 일은 굉장히 까다로운 일이다. 여러가지 네이티브 모듈이나 네이티브 파일을 건드리는 테스팅 툴을 세팅하고나서는 신경쓸 부분이 너무 많아서 엄두도 잘 나지 않는다.

그럼에도 불구하고 패키지네임을 바꿔야겠다면...! 이렇게 해보자.

[Quick guide for updating package name in React Native](https://dev.to/karanpratapsingh/quick-guide-for-updating-package-name-in-react-native-3ei3)

우선 위 링크를 따라한다. 한가지 이해가 가지 않는 점은 `APPLICATION_NAME`, 즉 사용자에게 보여지는 것도, 패키지네임도 아닌, 리액트 네이티브가 인식하는 프로젝트 이름이 `ios/{project}/Info.plist`의 `CFBundleDisplayName` 키에 할당되어 있다고 설명하는데, 이건 그냥 키 이름대로 디스플레이 네임이다 그냥.

위 링크 내용에 간단히 첨언하자면

- 'package.json`의 `name`과 `app.json`의 `name`은 패키지네임과 관련이 없으니 건드릴 필요가 없어보이고, 
- 보여지는 앱 이름은 앞서 말한 `ios/{project}/Info.plist`의 `CFBundleDisplayName` 그리고 `android/app/src/main/res/values/strings.xml` 의 `app_name` 을 수정하면 된다.
- 나머지 좀 애매한 친구들은 패키지네임으로 맞춰주자.
- 그리고 안드로이드 쪽 자바 파일 폴더구성도 패키지 네임에 맞춰서 변경해줬다. 예를들어 패키지네임이 `com.{company}.package` 이면, `android/app/src/main/java/com/{company}/{package}` 형태로 변경해줬다. 근데 사실 필수적인 건지 잘 모르겠다. 


