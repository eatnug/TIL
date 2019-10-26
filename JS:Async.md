# JS ASYNC
Javascript의 가장 큰 특징인 비동기처리에 대해 알아보자.

차례는 다음과 같다.

1. 비동기와 동기
1. JS Runtime 이해하기
1. 비동기를 동기적으로 처리하기
    1. 콜백
    1. Promise
    1. async, await

<br>


## 1. __비동기와 동기__

우선 비동기와 동기가 무엇인지 부터 알아보자.

### 동기

동기는 동시에 일어난다는 의미이다. 입력과 출력이 동시에 일어난다는 의미로, 1과 2를 순서대로 출력하면 결과도 1과 2가 순서대로 나와야 한다.

일반적인 프로그래밍 언어로 작성한 코드는 컴퓨터가 위에서 부터 한 줄씩 읽어들이며 동기적으로 동작한다.


동기적 프로그램은 설계가 매우 간단하고 직관적이지만 여러가지 작업을 해야할 때, 시간이 오래걸리는 작업 뒤에 배치된 작업은 계속해서 기다려야 하기 때문에 자원 낭비가 생길 수 있다.

### 비동기

동기와 반대되는 개념으로, 동시에 일어나지 않는다는 뜻이다. 입력과 출력이 동시에 일어나지 않기 때문에 비동기적인 프로그램은 같은 입력을 넣어도 다른 결과가 나올 수 있다.

비동기적인 프로그램은 한 줄, 한 줄 차례대로 실행되는 것이 아니라, 읽어 내려오다가 위로 갑자기 올라가기도 하고, 또 갑자기 내려가기도 한다. 그리고 어떤 작업이 실행되는 시간에 따라 필요한 값이 valid 할 수도, 아닐 수도 있기 때문에 결과 값이 일정하지도 않고, 예측도 어려우며 코드를 읽고 이해하기도 어렵다.

비동기적 프로그램은 설계가 복잡하고 어렵지만, 제대로 구성할 경우 자원의 효율성이 증가한다. 



## 2. __JS Runtime 이해하기__

Javascript는 웹 프로그래밍을 위한 스크립트 언어이다.

웹 프로그래밍에서 주의할 점은 사용자의 입력 혹은 서버로부터 받는 값 등이 내가 원하는 시기에 맞춰서 주어지지 않는다는 점이다.

그렇기 때문에, 웹 환경에서는 원하는 값이 들어올 때 까지 기다렸다가 valid 한 값을 가진 상태에서 동작하는 프로그램을 원하고 이러한 프로그램이 바로 비동기적 프로그램이다.

이러한 프로그램은 여러 프로세스 혹은 쓰레드를 동시에 가동하는 방식으로 구현이 가능한데, 아쉽게도 JS의 엔진은 다음과 같이 싱글 쓰레드로 구성되어있다.

![js engine](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-structure.png)

이 말은 JS 엔진은 우리가 쓴 코드를 한 줄, 한 줄 읽어내려가며 호출되는 함수 하나, 하나를 call stack에 쌓고 차례대로 (동기적으로) 실행한다는 뜻이다.

그렇다면 JS는 도대체 어떻게 웹 환경에서 비동기적으로 동작할까? JS의 실제 runtime을 그려낸 다음 그림을 보자.

![js runtime](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-runtime.png)

아까 그림과 달리 Web APIs, Event Loop, Callback Queue가 추가된 것을 알 수 있다. 

우리가 짠 JS 코드는 브라우저에서 동작한다. 앞서 말한 runtime에 추가된 세 가지는  브라우저에서 제공해주는 기능인데, 싱글쓰레드인 js가 비동기적 처리가 가능하게 하는 핵심적인 요인들이다.

JS 엔진이 코드를 읽다가 비동기적인 처리가 필요한 부분( setTimeout이나, ajax 등 )을 만나면 해당 부분은 Call Stack을 빠져나와 Web APIs 에서 비동기적 처리가 끝나기를 기다린다.

비동기적 처리가 끝나면 해당 작업은 Callback Queue로 enqueue 된다. 그러면 이 Callback Queue에 비동기 처리가 끝나고 이제 실행되어야할 ㅎ마수들이 차곡차곡 쌓일텐데 이들은 언제 실행될까?

바로 이떄 Event Loop이 등장한다.
Event Loop은 JS 엔진의 Call Stack을 주시하고 있다가 스택이 비면 Callback Queue에서 dequeue한 값을 Call Stack에 push한다.

그러면 다시 Call Stack에 함수가 올라가있으니, 이 함수가 실행되고 같은 작업을 반복한다.

직접 코드로 확인 해보자.

```javascript 
function foo(id) {
    setTimeout( () => {
        console.log(id)
    },1000)
}

console.log(1)
foo(2)
console.log(3)

// 1
// 3
// 2
```
보통의 프로그래밍 언어를 생각해본다면 위 코드의 결과는 1,2,3 순서로 출력되어야 할것이다. 하지만 JS는 그렇지 않다.

실행 순서를 보자.


- Call Stack에는 맨 처음 ```console.log(1)```가 올라가고 바로 실행 되고 끝난다.
- 그리고 ```foo(2)```가 올라가서 실행 되려고 할때 ```setTimeout```을 만나 webAPIs로 해당 부분을 쫓아낸다.
- 쫓아낸 부분이 webAPIs에서 ```setTimeout```에  지정한 시간을 기다리고 있는 사이에 Call Stack에는 ```console.log(3)```가 올라가고 바로 실행된다.
- 그 후에 Call Stack이 비게 되면 webAPIs에서 시간을 다 기다리고 callback Queue에서 차례를 기다리던 ```console.log(3)```가 Call Stack으로 올라가서 실행된다.


Call Stack의 변화 양상은 다음과 같다.

```console.log(1) -> foo(2) -> console.log(3) -> console.log(2)``` 


여기서 주의해야할 점은 Callback Queue에서 차례를 기다리는 작업은 Call Stack이 빌때 까지 절대 실행 될 수 없다는 점이다.

[참고](https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/)

## 2. __비동기를 동기적으로 처리하기__

이러한 JS의 비동기적인 작업의 처리 방식은 웹 환경에서 제대로 동작하는 프로그램을 만들기 위해서는 꼭 필요한 것 이지만, 앞서 살펴본 바와 같이 직관적이지 않고 설계는 커녕 이해하기도 어렵다.

그렇다면 이렇게 코드의 실행 순서가 뒤죽박죽이 되는 문제(비동기 문제라 칭하겠다)를 해결하고 동기적으로 동작하는 프로그램인 것 처럼 코드를 짜는 방법에는 어떤 것이 있을까?

초기 JS는 사실 이러한 부분을 위해서 언어 자체에서 제공하는 기능이 없었기 때문에 함수를 인자로 넘겨 비동기적 처리가 실행되는 부분까지 함수의 실행을 지연시키는 방법인 '__콜백__'이 사용되었다.

하지만 이러한 콜백 방식은 소위 말하는 '콜백 지옥'이라는 현상을 낳았고, 시간이 흘러 발전을 거듭한 JS는 현재(ES6 기준)에 이르러서는 Promise 객체, async/await 패턴 등 비동기 처리를 위한 기능들을 제공하고있다.

### 1. 콜백

#### "콜백 함수란 다른 함수에 인자로 넘겨지는 함수이다."

끝이다. 이게 전부다. JS는 함수를 [일급객체](https://ko.wikipedia.org/wiki/%EC%9D%BC%EA%B8%89_%EA%B0%9D%EC%B2%B4)로 취급하기 때문에 함수를 다른 함수의 인자로 넘길 수 있다. 그리고 이때 인자로 넘겨지는 함수를 콜백함수라고 한다. 잘 이해가 안간다면 예제를 보자. `date`는 `foo`에 인자로 넘겨지는 콜백함수이다.

```js
function foo(callback) {
    callback()
}

function date() {
    console.log(new Date())
}

foo(date)
```


그렇다면 이 콜백함수가 어떻게 비동기 문제를 해결할까?

답은 간단하다. 이름 그대로 나중에 호출하는 것이다.
위 예제에서 `date`는 `foo`가 호출되고 나서 그 내부에서, 시기적으로는 그 후에 호출된다. 

이런 방식을 이용해서, 비동기적 처리를 기다려야하는 함수를 실제로 해당 처리가 끝난 다음에 호출 하는 것이 바로 콜백을 이용한 비동기처리이다.

위의 예제를 수정해보자.


```js
function foo(callback) {
    setTimeout( () => {
        callback()
    },1000)
}

function date() {
    console.log(new Date())
}

foo(date)
```

만약 내가 `date` 함수를 1초 후에 실행하고 싶어졌다면 1초 후에 콜백함수를 호출하는 함수를 만들면된다.

위의 수정된 예제에서 `date`는 1초를 기다린다는 비동기적 작업이 끝난 뒤에 호출되어야한다. 그래서 `foo`에 콜백함수로 넘겨서 해당 작업이 끝난 뒤에 호출하도록 했다.

생각보다 간단하게 비동기 문제를 해결한 것 같다.

하지만 만약 내가 기다려야하는 작업이 여러가지라면 어떻게 될까? 사용자의 ID, 비밀번호, 주소를 입력받은 후에 실행해야할 함수 `foo`의 예를 한번 보자.

```js
function foo(){
    // 아무튼 처리를 기다렸다가 수행해야하는 함수
}

function work(callback) {
    getID(
        getPassword(
            getAddr(
                callback
            )
        )
    )
}
```

이런식으로 `foo`를 계속해서 콜백으로 넘겨야 하는데 이렇게 되면 코드가 굉장히 읽기 힘들어지며 난잡해진다.

이를 해결하기 위해 ES6에서 부터 js가 지원하는 기능이 `Promise` 객체이다.

### 2. Promise

`Promise` 객체는 말 그대로 약속이다. 니가 원하는 값이 지금 없으니 나중에 주겠다 이거다.

```js
const prom = new Promise( (resolve, reject) => {
    some_Async_func() {
            if ( it worked well ) {
                resolve(some result)
            }
            else {
                rejcet(error data)
            }
    }
})
```

위 코드는 Promise 선언의 예시이다. 코드를 보면 Promise가 어디서 본것과 유사하게 비동기적 처리가 필요한 부분을 감싸고 있다. 

이를 잘 해석해 보자면, '`Pomise`가 비동기적 작업의 처리가 끝나면 `resolve`의 인자 값을 반환 해 줄거고, 처리과정에서 문제가 발생하면 `reject`의 인자 값을 반환해주겠다.' 정도이다. 이때 `resolve`와 `reject`는 그저 `Promise` 내부에서 우리가 비동기적 작업의 성공과 실패에 따라 로직을 짤 수 있게 만들어 준 키워드이다.

그렇다면 처리가 끝난 Promise가 반환하는 resolve와 reject의 인자로 넘겨 준 값, 즉 비동기적 작업이 끝난 후 내가 결과에 따라 반환시킨 값은 어떻게 사용할까?

`Promise`는 `then`이라는 메소드를 가지고있는데, `Promise` 내부의 비동기적 처리가 끝나면 결과값을 `then` 메소드 내부의 콜백함수에 인자로 넘겨준다.

무슨말인지 잘 모르겠으니 아래의 `Promise` 사용 예시를 보며 확인해보자.

```js
function getData() {
    return new Promise(function (resolve, reject) {
        setTimeout( () => {
            resolve(`Promise ${Date.now()}`);
        }, 100)
    });
}


getData().then( (data) => {
    console.log(data)
})
console.log(Date.now())

getData().then( (data) => {
    console.log(data)
})

console.log(Date.now())

// 1564573130407
// 1564573130409
// Promise 1564573130513
// Promise 1564573130513
```

위의 `getData` 함수는 `Promise` 객체를 반환한다. 해당 `Promise` 객체는 `setTimeout`이 실행 된 후의 시점에서 `Date.now()`를 반환하겠다 라는 내용을 담고있다.

결과값을 보면 `console.log`를 이용해 출력한 값들 과 `getData`를 이용해 출력한 값들 사이에 약 100ms 만큼의 차이가 나는 것을 볼 수 있다.

이는 결국 `getData`를 통해 생성된 Promise의 결과값이 내부의 비동기적 처리를 끝낸 다음에 `then` 메소드에 인자로 넘어갔다는 사실을 의미한다.

간단히 정리해보자면 콜백은 함수를 인자로 넘기고 넘겨서 비동기처리가 끝난 다음 실행되게 하는 것이고, `Promise`는 `then` 메소드를 이용해서 비동기 처리가 다 끝난 결과값을 끌어와서 쓴다고 생각하면 될 듯 하다.

 *내부적 동작을 좀 더 알아보면 좋을 것 같다.

### 3. async/await

async와 await은 ES8부터 그러니까 비교적 최근에 정의된 문법이다. 최근에 나온 만큼, 제대로 이해한다면 비동기 문제를 해결하기 위한 아주 좋은 도구가 된다. 

그리고 사용하기도 아주 쉽다. 그냥 비동기적 처리를 기다려야하는 부분이 포함된 함수를 호출하는 상위 스코프(?)의 함수 선언부에 async 키워드를 붙이고, 비동기적 처리를 기다려야하는 부분 앞에 await 키워드만 붙여주면 끝이다.

단 한가지 주의해야 할 점은 `async function`과 `await` 되는 함수는 모두 `Promise`를 반환해야 한다는 점이다.

바로 예제를 살펴보자


```js

function getData() {
    return new Promise(function (resolve, reject) {
        setTimeout( () => {
            resolve(`Promise ${Date.now()}`);
        }, 100)
    });
}

async function tmpAsync() {

    let a = await getData()
    console.log(a)
    
    console.log(Date.now())

    a = await getData()
    console.log(a)

    console.log(Date.now())
}

tmpAsync()


// Promise 1564574628027
// 1564574628030
// Promise 1564574628135
// 1564574628135

```

위의 예제는 앞의 `Promise`를 활용한 예제를 `async function`을 활용하는 방식으로 수정한 코드이다

비동기적 처리가 필요한 부분을 감싼 `Promise`를 반환하는 `getData` 함수를 `async function` 내부에서 `await` 키워드를 붙여서 호출하면 해당 처리가 끝날 때 까지 기다렸다가 다음 작업이 수행된다.

예제 코드의 `tmpAsync` 함수를 호출하면 `await getData()` 에서 비동기 처리를 기다린 후 리턴 값을 a에 할당하고 다음 라인의 `console.log(a)`가 수행되는 방식으로 한 줄, 한 줄 코드가 진행된다

앞의 다른 두 방법과 달리 (약간의 제약은 있지만) async, await패턴은 실제로 동기적 프로그램과 같은 흐름으로 코드를 짤 수 있기 때문에 굉장히 강력한 비동기 처리 도구이다.