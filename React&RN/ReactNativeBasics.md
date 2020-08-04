리액트 네이티브는 리액트를 이용한 자바스크립트 기반 UI 개발방식으로 네이티브 환경 UI를 개발할 수 있게 해준다.

## 시작하기

리액트 네이티브 개발 환경을 구축하는 방법은 두가지가 있다. `expo cli`와 `react native cli`. 둘 다 일종의 `create-react-app`과 같은 도구인데, `expo cli`는 좀 더 많은 부분을 추상화해서 시작하기가 쉽지만 커스터마이징이 어렵고, `react native cli`는 그 반대이며, 실제 네이티브 코드를 작성해서 삽입할 수 있다.

일단은 `expo cli`로 시작해보자.

```bash
npm install -g expo-cli

expo init AwesomeProject
cd AwesomeProject
npm start
```

`expo-cli`를 설치하고, 프로젝트를 초기화하고 시작한다. 모바일 기기에서 `expo` 어플리케이션을 다운받고 계정을 연동하면 내 프로젝트를 확인할 수 있다.

## like React

리액트 네이티브. 이름 그대로 리액트와 많이 유사하다. 컴포넌트를 사용해서 UI를 설계하고, `props`, `state` 등의 개념도 그대로다.

## unlike React

리액트 네이티브에서 모든 컴포넌트는 `style`이라는 `props`를 갖는다. 말그대로 해당 컴포넌트의 스타일을 결정하는 정보를 담고있다. 간단히, `css`정보를 키,밸류 형태로 담고있는 객체라고 생각하면 된다. 속성 이름은 `camelCase`이다. 그리고 컴포넌트가 커지고 한 파일에서 여러 내용을 작성하는 경우를 위해 `StyleSheet.create({})` 형태로 스타일을 지정하는 방법도 있다.

### Style

그럼 이 스타일은 어떻게 구성할까? 큰 틀은 일반적인 css와 비슷하다. 특이한 점은 `flex`라는 속성이다. 화면에서 차지할 공간을 비율로 나타내는 속성이다. 예를들어 화면이 같은 레벨의 3 컴포넌트로 구성되고 `flex` 값이 1이라면, 각각 1:1:1의 비율로 화면에 나타난다. 이 외에 `flexDirection`이나 `alignItems`와 같은 속성도 자주 사용되는데 기존의 `css`와 동일하게 사용할 수 있는 듯 하다. 이제 리액트와 또다른 차이점인 컴포넌트에 대해 알아보자.

### Component

리액트 네이티브도 리액트와 같이 컴포넌트를 기반으로 한다. 그러나 웹에서 사용하는 `div`, `li`등의 태그를 사용하지는 않는다. 주로 사용하는 컴포넌트들은 다음과 같다.

- `View`
    - 가장 기본적인 컴포넌트.
    - 기본적으로 View로 다른 컴포넌트들을 wrapping하는 듯.
- `ScrollView`
    - 스크롤할 수 있는 View
- `Text`
    - 텍스트를 표현하는 컴포넌트. 
    - nested 될 수 있다.
- `TextInput`
    - 사용자 입력을 받는 컴포넌트.
    - `onChagngeText`, `onSubmitEditing` 등의 `props`를 가진다.
- `Button`
    - 터치 가능한 컴포넌트
    - `onPress`.
- `Touchables`
    - 버튼이 마음에 안들 때 사용할 수 있는 터쳐블한 컴포넌트들. 터치 피드백에 따랄 여러 종류
    - `TouchableHighlight`, `TouchableOpacity`, ...