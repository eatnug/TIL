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