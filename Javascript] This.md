React를 공부하기 시작하면서 컴포넌트 생성자부분에서 메소드의 this를 바인딩 해주는 코드를 이해하지 못해서, this에 대해 공부해보기로 했다.

OS 시간의 context switch 를 떠올려 보면 좋을 것 같다. 프로세스가 다른 프로세스에게 CPU를 넘겨줄 때, 혹은 빼앗길 때 그 때 CPU가 참조하는 context도 바뀌게 된다. 각 프로세스가 실행되는 상황에 대한 정보가 담긴 이 context를 this라고 볼 수 있다. 다만 이때의 this는 this를 호출하는 그 코드의 문맥을 참조한다.

context switch에서 해당 context가 프로세스에 종속적이듯, this는 이 this를 호출하는 부분의 코드에 종속된다.

다음 예제를 보자.

```js
function bike() {
  console.log(this.name);
}

function NewObj(name) {
    this.name = name
    this.bike = bike
}

var obj1 = { name: "건태", bike: bike };
var obj2 = { name: "eaTnuG", bike: bike };
var obj3 = new NewObj("GunTae");

obj1.bike();      // "건태"
obj2.bike();      // "eaTnuG"
obj3.bike();      // "GunTae"
```

각각 다른 객체 내부에서 호출되는 `this.name`는 각각 다른 값을 가진다. 이는 각자 호출되는 위치에서 this 값을 참조하기 때문이다.

그렇다면 코드의 최상위 스코프에서 `this`를 호출하면 어떻게 될까?

```js
console.log(this)   //Window { ... } 
```

브라우저와 Node.js 런타임에서 그냥 `this`를 콜하면 윈도우라는 객체를 가리킨다. 하지만 다음의 예제를 한 번 보자, 무언가 이상한다.

```js
function naive() {
    const local = "local"
    console.log(this)
    return function nested() {
        console.log(this)
    }
}

function strict() {
    'use strict'
    console.log(this)
}

var a = naive();        // Window { ... }
a()                     // Window { ... }
strict();               // undefined
```

우선 `navie()`는 `Window`를 출력하는 걸 보아 최상위 스코프에서 함수를 호출한 경우 해당 함수는 일반적으로 호출한 `this`와 같이 `Window`를 가리킨다. 

그런데 `naive()`가 리턴한 함수, 즉 함수 내부에서 중첩된 함수의 경우에 `this`를 호출할 경우에도 `Window`를 가리킨다. 이를 통해 함수에서 함수를 호출할 때에는 객체의 경우와 같이 `this`가 재설정 되지 않는다는 것을 알 수 있다. 객체의 경우에서 처럼 `this`가 가리키는 값이 변하는 것을 this 바인딩 이라고 하며 이를 인위적으로 할 수 있는 `bind` 메소드가 존재한다.

마지막의 `strict()`에서는 또 이상한 결과가 나왔다. `strict` 함수 내부의 `'use strict'` 부분은 말 그대로 'strict' 한 규칙을 사용하겠다고 선언하는 것 인데, 이 규칙 아래에서의 `this`,  그러니까 최상위 스코프에서의 `this`, 따로 명시적으로 binding이 되지 않은 `this`는 undefined가 된다. 다시말해 우리가 위에서 `this`를 호출했을 때 나온 `Window`는 사용자의 편의를 위해 완화된 규칙에 따라 스크립트가 런타임에 할당 해주었다는 것이다.

그렇다면 `this`를 바인딩 하는 방법에 대해 알아보자.

우선 맨 처음의 예제 처럼 객체의 경우에는 자동으로 바인딩이 된다. 문제는 함수의 경우인데, 이를 알아보자.

```js
function Family(firstName) {
  this.firstName = firstName
  const names = ['bill', 'mark', 'steve']
  names.map(function(lastName, index) {
    console.log(lastName + ' ' + this.firstName)
    console.log(this)
  })
}
const kims = new Family('kim')
// bill undefined
// window
// mark undefined
// window
// steve undefined
// window
```

위의 예제에서 `Family`라는 생성자 함수 안에서 `map` 메서드를 호출하는데 이 함수의 `this`가 우리가 생각하는대로 `Family`를 가리키지 않는다. 이는 `map`의 `this`는 `Family`를 가리키지만 내부의 함수에는 `this`가 바인딩 되지 않아서 인데, 이를 해결하는 방법을 살펴보자

```js
function Family(firstName) {
  this.firstName = firstName
  const names = ['bill', 'mark', 'steve']
  const that = this
  names.map(function(value, index) {
    console.log(value + ' ' + that.firstName)
  })
}
const kims = new Family('kim')
// bill kim
// mark kim
// steve kim
```

첫번째 방법은 사용하고자 하는 this를 변수에 저장해 사용하는 것이다. 보통 `that`이라는 변수명을 사용한다.

```js
function Family(firstName) {
  this.firstName = firstName
  const names = ['bill', 'mark', 'steve']
  names.map(
    function(value, index) {
      console.log(value + ' ' + this.firstName)
    }.bind(this)
  )
}
const kims = new Family('kim')
```
두번째 방법은 앞서 언급한 `bind` 메소드를 사용하는 것이다. 이렇게 하면 함수가 실행될 때 사용할 `this`를 사용자가 지정할 수 있다.

그리고 이러한 패턴을 위해 메소드 자체적으로 this를 인자로 넘겨받기도 한다. 아래의 두 코드는 똑같이 동작한다. `map` 메소드의 `thisArg` 인자로 `this`를 넘겨준 것이다.

```js
names.map(
    function(value, index) {
        console.log(value + ' ' + this.firstName)
    }.bind(this)
)
names.map(
    function(value, index) {
        console.log(value + ' ' + this.firstName)
    }, this
)
```

하지만 이러한 모든 방법은 너무 번거롭다는 공통점이 있다. ES6에 추가된 화살표 함수를 이용하면 이러한 문제를 한번에 해결할 수 있다.

```js
function Family(firstName) {
  this.firstName = firstName
  const names = ['bill', 'mark', 'steve']
  names.map((value, index) => {
    console.log(value + ' ' + this.firstName)
  })
}
const kims = new Family('kim')
```

화살표 함수를 사용하면 this를 그대로 다음 스코프로 넘겨줄 수 있다.

- 참고1: [\[javascript\] this는 어렵지 않습니다.](https://blueshw.github.io/2018/03/12/this/)
- 참고2: [JavaScript — all about “this” keyword](https://codeburst.io/all-about-this-and-new-keywords-in-javascript-38039f71780c)