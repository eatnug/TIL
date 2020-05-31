앱으로 파일 열기 구현하면서 한 삽질을 정리해보자.

외부의 pdf 파일을 우리 앱의 시작 포인트로 잡기위해 공유기능을 구현해야했는데, 이런 저런 사정으로 앱으로 파일 열기 형태로 구현 해보았는데 삽질을 엄청나게 했다.

우선 [데브 야쿠자님의 글](https://dev-yakuza.github.io/ko/react-native/open-file-with-app/)을 따라했다. 공유하기 기능과 비슷하게 구현하기 위해 사용한 walkaround를 방법을 간단히 설명해보자면 다음과 같다.

- 파일을 우리앱으로 연다. ( 이때 파일이 우리 앱 자체의 폴더 내부로 복사된다.)
- 이 파일을 여차저차 읽어내고, 사용한다.

이 __여차저차__ 부분이 아주 고역이었다. 이를 가능케 하려면 파일을 우리 앱으로 열 수 있게 설정해야하고, 해당 파일이 어디에 저장되는지 찾아야하며 `react-native-fs` 라이브러리도 뭔가 문제가 있는지 `pod install` 에서 에러를 뿜기 때문에 해결해줘야한다.

## react-native-fs

우선 라이브러리부터 설치해보자. `react-native-fs` 자체의 문제인지 의존하고 있는 라이브러리의 문제인지, 내부에서 `React/Core`라는 모듈을 참조하려고 하는데 이는 이제 `React-Core`라는 이름을 쓰나보더라 그래서 계속 `pod install`이 안됐다. 그냥 스크립트로 통으로 수정해줬다.

```bash
grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'
```

## 우리 앱으로 파일 열 수 있게 수정하기

이부분에서 iOS는 별 문제가 없었다. 야쿠자님의 글 대로 `info.plist`에 자기가 원하는 확장자로 파일을 열 수 있게 명시만 해주면 된다. 

말을 듣지 않았던건 안드로이드 쪽인데 `MainActivity.java` 파일을 수정해서, 우리 앱으로 여는 파일을 복사해야한다. 해당 코드는 야쿠자님께서 잘 작성해두셨으나, 안드로이드 앱  `MainActivity` 에서 `onResume`(약간 리액트의 라이프사이클과 비슷한 듯?)을 오버라이딩 하는 과정에 문제가 있었다. 안드로이드에서 앱을 여는 형태?를 나타내는 `Intent`, 그리고 그 `Intent`에서 받아올 수 있어야 하는 `Data`를 받아오지 못하더라. 

그래서 새로운 `Intent`가 들어올 때 트리거 되는 `onNewIntent` 메소드를 오버라이딩 해서 문제를 해결했다.

다른 코드는 똑같고 야쿠자님 포스팅에서 `onResume` 부분을 `onNewIntent` 쪽으로 옮겨주면 된다.
```java
@Override
public void onNewIntent(Intent intent) {
  super.onNewIntent(intent);
  setIntent(intent);

  Uri uri = getIntent().getData();

  if(uri != null) {
      try{
          importData(uri);
      }catch (Exception e) {
          Log.e("File Import Error", e.getMessage());
      }
  }
}
```

## 복사한 파일을 찾아오기

위의 내용을 끝내면 이제 원하는 파일을 우리 앱으로 열 수 있다. 즉 우리 앱 하위 폴더로 해당 파일이 복사된 것이다. 그런데 어디에...? 이부분은 또 안드로이드는 말을 잘 들었다.

블로그 글에 따르면 iOS 에서는 `RNFS.DocumentDirectoryPath` 폴더 하위의 `/Inbox` 폴더에 해당 파일이 저장된다고 하는데, 그렇지 않은 경우가 있었다. 사파리에서 파일을 곧장 공유하려고 하면 해당 폴더로 가지만 다운받은 파일을 열때는 `RNFS.TemporaryDirectoryPath` 폴더 하위의 ``/${번들아이디}-Inbox`` 폴더로 가더라. 그래서 이 부분을 따로 처리해줬다.


이렇게 하면 파일을 우리 앱으로 열 수 있고, 해당 파일에 접근해 사용할 수 있다!