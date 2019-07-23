## 기본문법

- 변수 선언은  var, const, let 등의 키워드로
- 세미콜론 붙이는게 좋지만 필수는 아님(?)
- for 조건식은 C와 처럼 쓰면 된다.
- for in, for of 등 순회 방법이 좀 더 많다.
- 함수를 선언할 수도 있고, 표현식으로 변수에 할당할 수도 있다.

<br>

## JS의 특징

js는 인터프리터 언어, 웹 페이지 스크립트 언어이다.

### ___JS runtime 이해하기___

js는 runtime에 call stack, task queue, event loop를 가진다.
chrome의 js engine인 V8은 call stack과 heap을 가지고, chrome이 task queue와 even loop, webapis를 제공한다.

![js runtime](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-runtime.png)
- V8엔진은 코드를 읽을것이고 함수를 호출하면서 call stack에 쌓는다. 
- setTimeout 같이 js 외부에서 제공되는 함수들(?)은 webapis로 쫓겨나고 작업이 끝나면 task queue에 추가된다.
- event loop은 call stack이 비어있는지 확인하고 만약 비어있다면  task queue에서 하나를 들고와서 call stack에 넣는다.
- [참고](https://www.youtube.com/watch?v=8aGhZQkoFbQ)


### ___single thread___
js는 single thread로 동작한다. 즉 call stack이 하나 뿐이라는 뜻이다. 이로인해 js의 많은 특징들이 나타난다. 더 공부하자.

### ___dynamic type___
js의 변수는 자료형이 런타임에 결정된다.

### ___hoisting___
js는 함수와 변수의 선언을 제일 해당 scope 최상위로 가져온다.
이로인해 선언과 할당 이전에 호출이 이루어지면 오류가 나는게 아니라 선언만 이루어졌다고 판단하고 undefined 값을 리턴하는 경우가 있다.

### ___this___
함수의 현재 실행 문맥 정도로 이해하면 될듯. 쓰면서 꼬이는 경우가 많으니까 그때그때 정리해보자. [참고](http://webframeworks.kr/tutorials/translate/explanation-of-this-in-javascript-1/)

<br>

## 비동기처리하기

### ___generator와 promise를 활용한 비동기 처리___
비동기 처리가 필요한 함수를 generator로 생성하고 처리가 필요한 부분에 yield로 정지선을 그어둔다.
후에 필요한 작업이 완료되면 iterator.next()를 호출하여 실행한다.
[참고1](https://meetup.toast.com/posts/73)
[참고2](https://velog.io/@rohkorea86/series/Generator-%ED%95%A8%EC%88%98%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EC%9E%90)

```js
/* gerator와 iterator 사이에서 값 넘기고 받기 */
function *myGen() {
    const x = yield 1;       // x = 10
    const y = yield (x + 1); // y = 20
    const z = yield (y + 2); // z = 30
    return x + y + z;
}

const myItr = myGen();
console.log(myitr.next());   // {value:1, done:false}
console.log(myitr.next(10)); // {value:11, done:false}
console.log(myitr.next(20)); // {value:22, done:false}
console.log(myitr.next(30)); // {value:60, done:true}
```

<br>

## ES6

### ___const와 let___
js의 기본 변수 키워드였던 var은 function scope를 가지고 있고 재선언, 재할당 모두 가능했다. 이는 유연하지만 동시에 모호했다.
이러한 단점을 극복하기위한 변수 키워드가 ES6에서 생긴 const와 let이다.
#### | const
const는 재선언, 재할당이 불가능한 변수이다. block scope를 가진다. 하지만 const로 선언한 object의 내용은 수정가능하다. - > reference의 의미로 생각하면 될듯.
#### | let
재선언만 불가능한 변수이다. 재할당은 가능하다.

기본적으로 const를 사용하고 재할당이 필요할때 let으로 바꾸는 경우가 많은 듯.


### ___arrow function___

```() => {}``` 이런식으로 함수를 작성하는 방법. 짧고 간결한 표현외에도, this를 바인딩 하지 않는다는 특징이 있다. 즉 상위 this를 그대로 넘겨준다.
[docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### ___spread operator___
대상 배열을 개별 원소로 쪼갠다. 함수의 파라미터부분에 작성하면 임의의 개수로 인자를 넘겨받아 iterate 할 수 있고, 이를 rest parameter라고 한다. [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### ___symbol___
ES6에서 추가된 원시타입이다. 충돌 위험이 없는 프로퍼티 키로 사용해 객체에 Unique한 속성을 만들기 위해서 사용한다.
### ___itertator___
반복을 위해 설계된 특정 인터페이스가 있는 객체. symbol.iterator 를 가지고있다.
결과 객체를 반환하는 next() 메소드를 가지고 있는데 결과 객체는 value, done 두가지 프로퍼티를 가지고있습니다.
iterator.next()로 하나씩 순회할 수 있습니다.
### ___generator___
iterable을 generate하는 함수입니다. function* 키워드로 선언할 수 있고 함수 내부의 yield 키워드는 next()가 반환할 값을 지정합니다.


<br>

## ES7

### ___decorator___
- django의 데코레이터랑 같은 듯.








