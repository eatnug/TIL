## 순수 객체

- 하나의 데이터만 담을 수 있는 원시 자료형들과 다르게 다양한 데이터를 담을 수 있는 자료형. 
- `키:밸류` 형태의 자료형으로 키에는 문자열, 밸류에는 다른 모든 자료형의 리터럴이 올 수 있다.
- `const`로 선언한 객체의 키, 밸류를 수정할 수 있다.
- 객체 리터럴의 키에 대괄호가 씌워져있으면 이는 계산된 값 혹은 변수를 키로 사용한다는 것이다.
- 키에는 별다른 제약사항이 없고, 예약어도 사용할 수 있지만 `__proto__`는 사용할 수 없다.

## 참조에 의한 객체복사

객체와 원시타입의 근본적인 차이 중 하나는 객체는 '참조에 의해' 저장되고 복사된다는 것.

```js
let string = 'message';
let otherString = string;

string = 'newMessage';

console.log(string, otherString) // 'newMessage message'
```

```js
let user = { name: 'John' };

let admin = user;

admin.name = 'Pete'; // 'admin' 참조 값에 의해 변경됨

alert(user.name); // 'Pete'가 출력됨.
```

따라서 객체를 온전한 의미로 복사하고 싶다면 다른 방법을 사용해야한다.

만약 객체의 모든 밸류가 원시타입이라면 `spread` 연산자로 쉽게 복사할 수 있다.
```js
let user = { name: 'John' };

let admin = {...user};

admin.name = 'Pete'; // 'admin' 참조 값에 의해 변경됨

alert(user.name); // 'John'이 출력됨.
```

아니라면 다른 deep copy 방법을 찾아보아야 한다.

## 가비지 컬렉션

가비지 컬렉션은 **도달 가능성**이라는 개념을 사용해 메모리 관리를 수행한다. 즉 어떻게든 접근 가능하거나 사용할 수 있는 값은 메모리에서 삭제되지 않는 다는 뜻이다. 

도달 가능한 값은 다음과 같다.

1. 기본적으로 도달 가능한 값들. 명백한 이유 없이는 삭제되지 않는다.

- 현재 함수의 지역 변수와 매개 변수
- 중첩 함수의 체인에 있는 함수에서 사용되는 변수와 매개 변수
- 전역 변수
- 기타

이 값들을 루트라고 한다.

2. 그리고 루트가 참조하는 값이나 체이닝으로 루트에서 참조할 수 있는 값은 도달가능한 값이 된다.

### [간단한 예시](https://ko.javascript.info/garbage-collection#ref-211)

```js
let user = {        // 여기서 객체 참조 값이 user에 저장된다.
  name: "John"
};

user = null         // 여기서 John에 접근할 방법이 없기 때문에 삭제된다.
```

### [참조 두 개](https://ko.javascript.info/garbage-collection#ref-212)

```js
let user = {
  name: "John"
};

let admin = user;

user = null;        // John은 admin을 통해 여전히 접근 가능하기 때문에 삭제되지 않습니다.
```

### [연결된 객체](https://ko.javascript.info/garbage-collection#ref-213)


```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});

delete family.father
delete family.mother.husband        // 여기서 John은 더이상 도달할 수 없게되어 삭제된다.
```

### 도달할 수 없는 섬

객체들 끼리 연결되어 섬 같은 구조를 만들어도 이 섬에 도달할 수 없을 경우 섬은 모두 삭제된다.

### 내부 알고리즘

`mark-and-sweep` 이라는 가비지 컬렉션 기본 알고리즘.

- `root` 정보를 수집하고 이를 `mark`한다.
- 루트가 참고하고 있는 모든 객체를 방문하고 `mark` 한다.
- `mark` 된 모든 객체에 방문하고 그 객체들이 참조하는 객체도 `mark` 한다.
- 루트에서 도달 가능한 모든 객체를 방문할 때 까지 과정을 반복.
- `mark` 되지 않은 객체를 메모리에서 삭제.

자바스크립트 엔진은 실행에 영향을 미치지 않으면서 더 빠른 가비지 컬렉션을 구현한 최적화 기법을 적용한다.

- generational collection(세대별 수집) - 객체를 오래된 객체와 새로운 객체로 나누고, 일정 시간동안 살아남은 객체는 오래된 객체로 분류하고 좀 덜 감시한다. 계속 쓰인다는 거니까.
- incremental collection(점진적 수집) - 여러 부분으로 분리한 다음 작업을 수행한다. 긴 지연을 짧은 지연 여러개로 분산시킨다.
- idle-time collection(유휴시간 수집) - cpu가 유휴상태일 때 gc를 실행한다.

## 메서드와 this

객체 프로퍼티에 할당된 함수를 메서드라고 함. 메서드 내부에서 해당 메서드를 선언한 객체의 정보에 접근하기 위해 `this`를 사용할 수 있음. 이때 `this`는 런타임에 그 값이 정해지기 때문에 다음과 같은 코드도 정상적으로 동작한다.

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

```

실행 컨텍스트라고 보는 것이 편할 듯.

몇 가지 볼 것들

```js
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

위와 같은 코드를 엄격 모드에서 실행하면, `this`는 `undefined`가 할당된다. 하지만 엄격모드가 아닐때는 전역객체를 참조한다. 브라우저에서는 `window`가 된다.

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi.bind(user);     // sayHi의 this를 user로 강제할당한다.

user.f(); // John  (this == user)
admin.f(); // John  (this == user)
```

### this가 없는 화살표 함수

화살표 함수는 고유한 `this`를 가지지 않고, 화살표 함수가 아닌 일반적인 외부 함수의 `this`를 가져온다.
```js
let user = {
  firstName: "보라",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // 보라
```
