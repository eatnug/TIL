## 정규표현식

html을 파싱하려고 여기저기에서 복사,붙여넣기로 사용하다가 갑갑해서 정리한다.

정규표현식의 사전적 정의는특정한 규칙을 가진 문자열의 집합을 표현하는데 사용하는 형식 언어이다. 쉽게 말하자면 문자열에서 특정판 패턴을 추출해 내기위한 도구라는 것이다.

그럼 내가 원하는 패턴을 어떻게 정규식으로 표현할 수 있는지 바로 알아보자.

## 표현 방법

정규표현식은 다양한 메타문자를 활용해 문자열의 패턴을 표현할 수 있게 해준다. 아래의 예를 보자.

```js
/*  
    js에서 정규식 패턴을 표현하기 위해서는 // 내부에 패턴을 작성하고, 
    패턴변수.exec(문자열) 형태로 해당 문자열에서 패턴을 검색한다.
*/
var re = /^p/       // 문자열이 p로 시작되는 패턴이라는 뜻이다.
re.exec("play")     // ["p", index: 0, input:"play", group:undefined]
re.exec("lpay")     // null
```

이런식으로 사용될 수 있는 메타문자들은 다음과 같다.

|문자|의미|
|---|---|
|^x|x로 시작한다.|
|x$|x로 끝난다.|
|.|아무 문자 하나와 일치한다.|
|x+|x가 1번 이상 반복된다.|
|x?|x가 0번 혹은 1번 등장한다.|
|x*|x가 0번 이상 반복된다.|
|x{m,n}| x가 m번이상 n번이하 반복된다.|
|[xy]|x,y 중 하나와 일치한다.|
|[^xy] |x,y를 제외한 문자 하나와 일치한다.|
|[x-z]|x부터 z사이의 문자 하나와 일치한다.|
|\b|문자와 문자 사이의 공백문자와 일치한다.|
|\d|숫자와 일치한다.|
|\s|공백문자와 일치한다.|
|\w|알파벳or숫자or_과 일치한다.|
|\B,\D,\S,\W| 소문자 메타문자와 반대의 값을 가진다.|
|\t| tab(U+0009)과 일치한다.|

패턴 표현은 [regexr.com](https://regexr.com)에서 연습해볼 수 있다. 이제 내가 원하는 패턴을 표현하긴 했는데 이걸 어떻게 사용할 수 있을까?

## JS에서의 정규식 사용

자바스크립트에서 정규식으로 표현한 문자열 패턴을 사용하는 방법은 크게 두 가지가 있다. 정규식 패턴을 나타내는 RegExp 객체의 메소드를 사용하는 법 그리고 문자열 메소드를 사용하는 법

### RegExp 객체 사용하기

우리가 아까 `/somePattern/` 형식의 값을 할당해준 변수가 바로 RegExp 객체이다. 이 객체는 `exec` 라는 메소드를 가지고 있는데, 이 메소드를 사용해 문자열에서 해당 패턴을 검색할 수 있다. 

[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)에 따르면, `exec()`은 현재 RegExp 객체의 패턴을 인자로 넘겨준 문자열에서 검색하고, 만약 매치에 성공하면 배열을 반환하고 RegExp 객체의 프로퍼티를 업데이트한다. 

이 배열은 다음과 같이 구성되어있다.

|result|value|
|---|---|
|[0]|매치 된 전체 문자열|
|[1]~[n]|매치 된 그룹 문자열들|
|index|매칭된 문자열의 인덱스|
|input|원본 문자열|

그리고 다음과 같이 RegExp 객체는 다음과 같은 프로퍼티로 구성된다.

|prop|value|
|---|---|
|lastIndex|index at which to start next match. if `g` is used always be `0`|
|ignoreCase|indicates if `i` flag used|
|global|indicated if `g` flag used|
|multiline|indicates if `m` flag used|
|source|the pattern text|

### String 객체 사용하기

String 객체의 메소드 중 `match`는 RegExp 객체를 매개변수로 갖는다. 만약 `RegExp.global`이 `false`라면, 즉 패턴에 `g` 플래그를 추가하지 않았다면, `someStr.match(reg)`는 `reg.exec(someStr)`과 같은 결과값을 리턴해준다. 즉 index와 input 프로퍼티를 갖는 배열을 리턴한다. 만약 `g` 플래그를 추가했다면 매치된 모든 그룹의 결과를 원소로 갖는 배열을 리턴한다.

Sting 객체의 또 다른 메소드 `matchAll()`은 `exec()` 처럼 매치된 패턴들의 iterator를 리턴한다. `Array.from`이나 `for ... of ...` 형태로 이터레이팅 하며 활용 가능하다. 허나 `exec`과 달리 `matchAll()`은 내부적으로 `RegExp` 객체를 만들어서 사용하기 때문에 원본 `RegExp` 객체의 lastIndex값이 변하지 않는다.

## 하지만...

주변의 조언을 얻은 결과 그냥 파서 라이브러리를 쓰기로 했다. 

