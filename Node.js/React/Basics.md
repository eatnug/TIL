리액트 공부를 간단히 정리할 겸 [공식문서](https://reactjs.org/docs/hello-world.html)의 기본개념 부분을 요약해보았다.

## React는?

React는 JS의 프론트엔드 라이브러리이다. 간단히 설명하자면 React는 [virtual DOM을 이용한 렌더링](https://eatnug.github.io/web/virtualDOM/)을 사용해 UI를 컴포넌트 단위로 구현한다. 공식 스타터킷 CRA 또는 서버사이드 렌더링을 위한 프레임워크인 Next.js 등을 활용해 프로젝트를 구축할 수 있다.

## 기본 개념

### JSX

React는 프론트엔드 라이브러리이다. 따라서 HTML 엘리먼트를 표현할 요소가 존재한다. 이를 JSX라고 하고 다음과 같은 형태이다.

```js
const element = <h1>Hello, world!</h1>;
```

HTML과 굉장히 유사하다. 주의할 점이라면, `{}` 내부에 JS 코드를 작성할 수 있다는 것. 그리고 `className`, `tabIndex` 등의 camelCase 프로퍼티 명명 규칙을 따른다는 것이다. 아래의 예제를 보자.

```js
const name = "eatnug"
const element = (
  <h1 className="greeting">
    Hello, world! - {name}
  </h1>
);
```

위 코드는 Babel에 의해 `React.createElement()` 호출로 변경되고, 렌더링 될 준비를 한다.

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world! - eatnug'
);
```

### 렌더링

HTML에 `id=root`인 `<div>`가 있다고 해보자.
```html
<div id="root"></div>
```
이 `<div>`에 React 엘리먼트를 렌더링하려면 다음과 같이 하면 된다.
```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

### Component와 Props

컴포넌트는 UI를 구성하는 부분들을 재사용 가능하도록 여러 조각으로 나눈 것이다. 구성은 JS의 함수와 비슷하다고도 생각할 수 있다. `props` 라는 인자를 입력받고 화면에 출력할 React 엘리먼트를 출력한다. 따라서 함수로 컴포넌트를 만들수도 있고 ES6의 클래스로도 만들 수 있다. 다음의 두 컴포넌트는 동일하다.

```js
/* 함수형 컴포넌트 */
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

/* 클래스형 컴포넌트 */
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

이렇게 만든 컴포넌트들은 React 엘리먼트를 반환하기 때문에 다음과 같이 사용할 수 있다.

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

이때 컴포넌트 호출시에 넘겨주는 속성값들이 `props`가 되어서 컴포넌트에 전달된다.

### State 와 생명주기 (클래스 컴포넌트)

State는 간단하게만 짚고 넘어가보자. Props는 리액트 엘리먼드를 호출할 때 속성 값으로 넘겨주는 데이터이고, State는 각 컴포넌트 내부에서 다루는 데이터이다. 

시계 컴포넌트가 있다고 생각해보면 다음과 같이 State를 설정하고 사용할 수 있다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    ...
    <p>현재 시간 : {this.state.date.toLocaleTimeString()}</p>
    ...
  }
}
```

이때 State의 값을 수정할 때에는 React의 규칙을 꼭 따라야만 한다.

```js
this.setState({ date: new Date() });
```
`this.setState()`는 현재 컴포넌트의 `State` 값을 수정한다. 인자로는 객체 리터럴을 받아서 `State`에서 해당 키의 값을 __대체__ 한다.

시계 예제에서 시간이 자동으로 업데이트 되게 하려면 컴포넌트의 생명주기를 활용해야한다. 리액트 컴포넌트는 생성되어서 페이지에 렌더링 될 때 부터 없어질 때 까지 여러 단계를 거친다. 이를 컴포넌트의 생명주기라고 한다.

![](https://github.com/eaTnuG/TIL/blob/master/statics/images/lifecycle.png)

이때 각 단계에서 호출되는 메소드를 오버라이딩해서 특정 단계에서의 수행할 작업을 지정해줄 수 있다. 시계 컴포넌트의 예를 다시 보자

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentDidUpdate(){
    console.log('time updated')
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    ...
    <p>현재 시간 : {this.state.date.toLocaleTimeString()}</p>
    ...
  }
}
```

위의 예제에서 `Clock` 컴포넌트는 최초에 렌더링 되고 나서 `componendDidMount()`가 실행되어서 1초마다 `this.setState()`를 호출하여 `state` 를 업데이트한다. `state` 값은 반드시 이런 형태로 업데이트 해야한다.

`state` 가 업데이트 될 때 마다 `componentDidUpdate()`가 실행되어서 `time updated`라는 내용이 콘솔창에 찍히고, 컴포넌트가 DOM에서 삭제 될 때 `componentWillUnmount()`가 실행되어 매 초 `state`를 업데이트 작업이 중단된다.


### 이벤트 핸들링

리액트에서는 `return false`로 기본동작 방지가 불가능하다. `preventDefault`를 명시적으로 호출해주어야 한다. JSX에서 핸들러 지정은 `{}`에 핸들러 함수를 전달하는 방식으로 이루어지는데, 이 경우 this는 전달되지 않기 때문에 주의해야한다. 코드를 보며 확인해보자.

```js
class Toggle extends React.Component {
  constructor(props) {
    ...
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    ...
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        ...
      </button>
    );
  }
}
```
위 처럼 `constructor` 에서 `this`를 명시적으로 바인딩 해주거나 
```js
  render() {
    return (
      <button onClick={(e) => {this.handleClick(e)}}>
        ...
      </button>
    );
  }
```

함수를 호출하여서 this를 암묵적으로 바인딩 해버릴 수 있다. 이렇게 하지 않으면 `this`가 `undefined`가 된다.

### 조건부 렌더링

조건부 렌더링은 3항 연산자를 활용한다. 
```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

### 리스트와 Key

여러개의 컴포넌트를 렌더링하기 위해서는 컴포넌트 배열을 JSX에서 `{}` 안에 위치시키면 된다. 이때 리액트는 각 컴포넌트를 구별하기 위해 Key 값을 할당하도록 한다. 속성으로 Key 값을 전달해주어야 한다.

### 폼

사용자의 입력값을 바로바로 반영하기 위해 입력창의 값을 state로 관리한다. [Formik](https://jaredpalmer.com/formik) 이라는 라이브러리로 관리하기도 하는 듯.

