## React의 문제 - 상태관리

React는 결국 데이터 변화에 따른 렌더링을 관리하기 위한 라이브러리라고 생각한다. 그래서 이 데이터의 변화 또는 데이터 자체를 잘 관리하는 것이 중요한 작업인데, 그렇게 쉽지만은 않다.

UI의 각 부분을 컴포넌트라는 독립적인 부분으로 나누어서 구현하는데, 이때 어떤 데이터를 어떤 컴포넌트의 State로 관리할지를 정하는 것이 어렵기 때문이다. 편의를 위해 최상위 컴포넌트에서 모든 데이터를 관리할 수도 있지만 그렇게 되면 실제로 데이터를 다룰 컴포넌트에게 데이터를 전달하는 과정이 번거로워질 수 있다. 

## 상태관리 도구, Redux

이러한 State, 즉 상태 관리의 문제를 해결하기 위한 도구가 바로 Redux 이다. 사실 redux는 react를 위해 만들어진 도구는 아니고, 그냥 상태관리를 위한 JS 라이브러리이다. 그런데 아직 다른 상태관리 케이스는 몰라서 넘어가도록 하겠다. 큰 그림을 보자면 다음과 같다.

![](https://github.com/eaTnuG/TIL/blob/master/statics/images/withredux.png)

store라는 전역적인 상태관리를 위한 컨테이너를 생성해서 사용하는 것이다. Redux를 어떻게 사용할 수 있는지 알아보자.

## Redux 기본 개념

그렇다면 store를 이용한 상태관리는 어떻게 이루어질까?

![](https://github.com/eaTnuG/TIL/blob/master/statics/images/store.png)

위의 그림은 store와 Component의 상호작용을 간략하게 표현한 것이다.

`store`는 우리가 관리하려는 데이터인 `State`와 `Reducer`라는 것을 가지고있다. 데이터를 수정하고자 할 때 컴포넌트는 `action`을 `dispatch` 하고, 필요한 데이터를 `store`에서 가져올 수 있다. 이제 이 Redux 환경을 구성하는 요소들에 대해 알아보자.

### store(상태 저장소)

말 그대로 상태를 저장하는 곳이다. `store` 두 가지 요소로 구성된다. 우리가 다룰 데이터의 현재 상태인 `State`와 데이터를 변경하기 위한 인터페이스인 `reducer`가 그것이다. 간략하게 나타내면 아래와 같은 형태이다.

```js
const store = {
    "State":{
        "session": data,
        "other": things
    },
    "Reducer":{
        "sessionReducer": func to change session data,
        "otherReducer": func to change other data
    }
}
```

Reducer에 대해서는 별도의 항목에서 더 자세히 설명하겠다.


### Dispatch(store에게 메시지 보내기)

상태를 변경하려고 할 때에는 store에게 어떤 데이터를 어떻게 변경할 지 알려줘야한다. 이 때 store에게 메시지를 전달하는 것이 바로 `dispatch`이다. 인자로 내가 __어떤 변경을 할 것__ 인지 넘겨서 호출하면 `store` 에게 메시지를 전달한다.

### Action(store에 전달할 메시지)

이부분과 Reducer가 가장 이해하기 어려웠 던 것 같다. 쉽게 말하면 __'내가 어떤 행동을 하겠다'__ 라는 선택이라고 생각하면 된다. 

아케이드 게임기를 생각해보자. 펀치, 킥, 점프 등의 버튼이 있고 유저는    어떤 __동작(action)__ 을 취하기 위해서 버튼을 누를 것이다. 이때 내가 취하려는 행동인 펀치, 킥, 점프 등이 액션이다.

### Reducer(Action 해석기)

위의 사진에서 볼 수 있듯이 컴포넌트가 `action`을 `dispatch`하면 `store`에게 전달되는데 이는 먼저 `reducer` 부분을 거친다. `reducer`가 컴포넌트로부터의 메시지를 받아서 해석하고 `state`에 적절한 작업을 반영하는 것이다. 내가 점프 버튼을 누르면 캐릭터는 점프를 하는데 Reducer가 바로 버튼과 점프하는 캐릭터 사이를 연결하는 역할이다.

## Redux로 React 앱 상태관리 하기

아케이드 게임기를 예로 들어 Redux의 작업 흐름을 이해해보자.

![](https://github.com/eaTnuG/TIL/blob/master/statics/images/arcade.png)

위 그림에서 각 버튼은 왼쪽, 가운데, 오른쪽으로 구슬을 발사하고, 필살기로 폭탄을 발사하는 버튼이고, 화면 아래쪽의 캐릭터는 사용자 입력에 따라 대포의 방향을 바꾸거나 구슬 대신 폭탄을 발사해준다. 발사된 구슬은 궤도대로 날아가 다른 구슬들 옆에 붙거나 터지고 폭탄이 날아가 많은 구슬을 터트리기도 한다. Redux도 이와 똑같이 동작한다. 코드로 살펴보자.

Redux 형태를 구현하는 방법은 정해져있지 않다. 하지만 몇가지 패턴들은 존재한다. 우선은 공식 문서의 형태를 따르기로 하자.

우리가 구현해야할 것은 앞서 살펴본 Redux의 구성 요소 중 우리가 만들어야 하는 것은 action과 reducer이다.

### action 만들기

아케이드 게임의 비유를 떠올려보자. 여기서 우리에게 만들고자 하는 동작은 왼쪽, 가운데, 오른쪽으로 대포를 발사해 해당 방향에 구슬을 붙이는 것, 그리고 폭탄을 발사하는 것이다. 이를 구현하는 코드를 보자.

```js
/* actions.js */

/*
 * action types
 */

export const LEFT = 'SHOT_LEFT'
export const CENTER = 'SHOT_CENTER'
export const RIGHT = 'SHOT_RIGHT'
export const BOMB = 'SHOT_BOMB'


/*
 * action creators
 */

export function L () {
  return { type: LEFT }
}

export function C () {
  return { type: CENTER  }
}

export function R () {
  return { type: RIG }
}
export function B (bomb){
    return { type: BOMB, bomb: bomb }
}
```

우리가 구현할 것은 action 이라고 했는데 두 가지로 나뉘어졌다. 이는 나중에 프로젝트 규모가 커지는 경우 그리고 각 액션에 인자로 넘길 데이터가 생길 경우 등을 고려해 단계를 나누어 둔 것이다. 

`action type`은 우리가 하고자하는 행동을 나타낸다. 위의 예시에서는 각 방향으로 구슬 쏘기와 폭탄 발사하기가 있다. 

`action creator`는 각 행동에 대해 정형화된 아웃풋을 내는 함수인데, 추가적으로 필요한 인자도 여기서 처리해준다. 쉽게 말하자면 우리가 하고자 하는 행동을 `store`가 받아들일 수 있는 형태로 만들어주는 것인데, 이는 위의 예시에서 버튼과 비슷하다고 볼 수 있다. 왼쪽으로 구슬을 쏘겠다는 우리의 의사를 전기적 신호로 전달하기 위한 매개 인것이다.

다시말해 `action` 을 만들기 위해서는, 데이터에 가할 조작의 종류인 `action type`을 지정하고 이러한 `action`을 store가 받아들일 수 있는 형태로 만들어주는 `action creator`를 만들어주면 된다.

### reducer 만들기

이제는 우리의 `action`을 해석해서 `state`에 적절한 작업을 취해 줄 `reducer`를 만들어야 한다. `reducer`는 우리가 `L` 버튼을 누르면 대포를 왼쪽으로 돌리고 발사해야한다. 이를 코드로 구현해보자.

```js
/* reducers.js */

import { combineReducers } from 'redux'
import { LEFT, CENTER, RIGHT, BOMB } from './actions'

function bubbles (state = "initial state", action){
    switch(action.type){
        case LEFT:
            return newStateAfterAction
        case CENTER:
            return newStateAfterAction
        ...
        default:
            return state
    }
}

function otherState (state = "other initial state", action){
    switch(action.type){
        ...
    }
}

const reducer = combineReducers({
  bubbles,
  otherState
})

export default reducer
```

좀 복잡해보인다. 하나하나 천천히 뜯어봐야겠다. 

`bubbles`는 구슬의 상태 정보를 다루는 `reducer`이다. 우선 현재의 상태 정보인 `state`를 인자로 받고, 만약 입력이 없다면 초기값을 할당해준다. 그리고 우리가 만든 `action creator`가 반환하는 객체인 `action`도 인자로 받는다. 내부에서는 `action type`에 따라서 변화가 반영된 새로운 `state` 값을 반환한다. 여기서 주의할 점은 기존의 `state` 값을 변경하는 것이 아니라, 새로운 값을 리턴해야한다는 것이다. 이는 redux를 사용하며 지켜야하는 원칙이다. 따라서 Spread Operator가 자주 사용되고는 한다.

다음 함수는 `state`에서 관리하는 또 다른 데이터에 관한 `reducer` 이다. 이는 우리의 비유가 아닌 실제 앱을 위한 예시이다. 실제 우리가 다루는 `state`는 꽤 복잡하고 크다. 즉 다양한 데이터를 다룬다는 것이다. 각 데이터 마다 수행할 작업(`action`)이 다르기 때문에 `reducer`는 데이터 마다 하나씩 만들어야한다. 

현재 우리 앱의 `state`를 보면 아래와 같은 상태일 것이다.

```js
const state = {
    bubbles: ~~~,
    otherState: ~~~
}
```

이제 우리가 만든 개별 리듀서들이 `state`의 각 값들을 핸들링 할 수 있게 매칭해주어야 한다. 이를 코드로 보면 다음과 같을 것이다.

```js
function reducer(state = {}, action) {
  return {
    bubbles: bubbles(state.bubbles, action),
    otherState: otherState(state.otherState, action)
  }
}
```

실제 앱에서 많은 데이터들을 다루는 많은 리듀서들을 이렇게 하나하나 합치는 작업을 편하게 해주기 위한 함수가 바로 `combineReducer`이다. 아래의 코드는 위의 코드와 동일하다.
```js
const reducer = combineReducers({
  bubbles,
  otherState
})
```

드디어 `action`과 `reducer`를 다 만들었다. 이제 `store`를 생성하고 사용하기만 하면 된다.

### store 생성하고 상태관리 하기

이제 실제 React 앱에서 Redux를 이용해 상태관리를 해보자. 

Redux의 `store`는 모든 컴포넌트가 공유하는 전역적인 상태 컨테이너라고 했다. 그렇기 때문에 최상위 컴포넌트를 렌더링하는 곳에서 `store`를 선언하고 하위 컴포넌트들에게 전달 해주어야 한다. 

아래 코드는 CRA로 만들어진 React 앱에서 store를 생성하고 하위 컴포넌트로 전달하는 예시이다.

```js
/* index.js */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

우선 최상위 컴포넌트인 `<App />`을 DOM에 렌더링하는 `index.js`에서 작업을 진행한다. 우선 `redux` 패키지의 `createStore()`에 우리가 만든 `reducer`를 인자로 넘겨 `store`를 만든다. 그리고 `react-redux` 패키지의 `Provider` 컴포넌트를 활용해 해당 `store`를 하위 컴포넌트 모두가 접근 가능하도록 전달한다.

거의 다 왔다. 이제 실제로 컴포넌트에서 `store`에 접근해 `state`를 변경시키고 값을 읽어오는 과정을 보자.

```js
/* App.js */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { L, C, R, B } from "./actions";

function App() {
  const bubbles = useSelector(state => state.bubbles);
  const dispatch = useDispatch();
  return (
    <div className="App">
        <div className="Panel">
        {bubbles}
        </div>
        <div className="Buttons">
            <button onClick={() => dispatch(L())}>L</button>
            <button onClick={() => dispatch(R())}>C</button>
            ...
        </div>
    </div>
  );
}

export default App;
```

위는 실제로 데이터를 조작하는 `<App />` 컴포넌트다. `react-redux`에서 `useSelector(), useDispatch()` 를 불러와 사용한다. 

`useSelector()` 함수를 사용해 `state`의 특정 값을 불러올 수 있다. 그리고 `useDispatch()` 함수를 사용해 `store`에 `dispatch` 하는 함수를 지역 변수에 할당해 사용할 수 있다.

그리고 `dispatch()` 함수를 호출하는 형태에 유의하자. 이벤트가 발동되면 `dispatch()` 함수를 호출하는데 이때 인자로 우리가 만들었던 `action creator` 함수의 결과값을 넘겨준다. 이는 결국 `action type`과 추가적인 인자를 가진 `action` 객체를 `dispatch` 한다는 의미이다.

이렇게 Redux 를 활용한 React 앱 상태관리가 끝났다.