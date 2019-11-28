테크코스를 위해 벼락치기를 해보자!

## How it works!

소스코드 파일은 `code.java` 파일로 생성되고, 이를 자바 컴파일러가 `code.class` 파일로 변환한다. 이 파일은 Java Virtual Machine이 실행 할 수 있는 파일이다. 즉 우리가 만든 코드(`.java`)는 중간 파일(`.class`)로 한번 변환되고 JVM이 이 프로그램을 실행한다. 

언뜻 복잡해보이는 이러한 방식은 JVM이라는 중간 과정을 포함해서 어떤 OS에서든 한 소스코드로 개발할 수 있게 해준다.

소스파일을 한번 보자

```java
public class HelloWorld {
    public static void main(String args[]) {
        System.out.println("Hello World");
    }
}
```

기본적으로 클래스 단위인 듯 하다. 이 파일을 실행하면 `public class`의 `public main` 메소드가 실행된다.

## Basic Syntax

변수와 자료형

```java
/*  
변수 선언
type name = value 
*/

int intVar = 1

/*
메소드 선언( 자바는 클래스 기반이라서 함수, 메소드 구분 없다.)
outType name(inType inName){
    logic
}
*/

int plusOne(int og){
    return og + 1
}

/*
자료형에서 주의할 것들
*/

// char과 String
char character = 'c'    // 문자는 ''로
String string = "string" // 문자열은 ""로

// String과 StringBuffer
// String은 길이 변경 X. 새로 만들어서 리턴.

// 배열

// type[] name = new type[length]
int[] odds = {1, 3, 5, 7, 9};

// Generics

ArrayList<String> pitches = new ArrayList<String>();
HashMap<String, String> map = new HashMap<String, String>();
```

분기와 반복

```java
/* if */
if (조건문1 && 조건문2) {
    ~
}else if (조건문3 || 조건문4) {
    ~
} else {
    ~
}

/* switch/case */
switch(입력변수) {
    case 입력값1: ...
         break;
    case 입력값2: ...
         break;
    ...
    default: ...
         break;
}

/* while */
while (조건문) {
    ...
    break;
    ...
    continue;
}

/* for */
String[] numbers = {"one", "two", "three"};
for(int i=0; i<numbers.length; i++) {
    continue;
    System.out.println(numbers[i]);
}

/* for ... each */
String[] numbers = {"one", "two", "three"};
for(String number: numbers) {
    System.out.println(number);
}
```

## Class

- 클래스는 `class` 키워드로 명세하고, `new` 키워드로 생성한다. 
- 메소드는`return_type method_name (...args){}` 형태로 선언한다.
- `extends` 키워드로 상속도 가능하다. 다만 단일 상속만 되는 듯. 
- 생성자는 클래스와 동일한 이름으로 리턴 타입을 입력하지 않고 선언한다.
- 추상클래스는 인터페이스 이면서도 구현체도 가지고 있는 클래스이다.
- 추상클래스는 `abstract`라는 키워드를 활용하는데, 클래스 선언시에 이를 추가하고, 만약 메소드에 사용하면 인터페이스 메소드처럼 뼈대만 만들 수 도 있다.

## Interface

- `implements` 키워드로 사용한다.
- 뼈대(메소드)를 만들고 이를 이용하는 클래스들이 각자 메소드를 구현하는 개념인 듯.
- 인터페이스는 `extends`를 이용하여 여러개의 인터페이스를 동시에 상속할 수 있다.
- 클래스도 `implement`로 여러개의 인터페이스를 구현할 수 있다.

## ETC

- __package__ 
    - 패키지는 클래스를 비슷한 성격의 것으로 분류하는 태그이다. `package` 키워드를 작성하고 저장하면 이 패키지 분류에 따라 디렉토리가 구분된다.
    - 패키지 스트링은 .을 이용해 폴더 레벨을 깊게 만들 수 있다. ex) `eatnug.test.day1` 패키지는 `src/eatnug/test/day1`에 저장될 것이다.
    - 패키지는 `import` 키워드로 불러올 수 있다.
- __접근제어자__
    - `private`: 해당 클래스에서만 접근 가능하다.
    - `default`: 제어자를 별도로 설정하지 않은 경우. 해당 패키지 내에서만 접근 가능하다.
    - `protected`: 동일 패키지 내의 클래스, 또는 해당 클래스를 상속받은 외부 패키지의 클래스에서 접근이 가능하다.
    - `public`:  모든 곳에서 접근 가능하다.
- __static__
    - 어떤 객체변수가 모든 인스턴스에 걸쳐 동일한 값을 지니고 있어야 한다면 이를 `static` 키워드로 선언한다.(변경을 방지하는건 `final`)
    - `static`으로 선언한 변수는 단 하나만 존재하고 모두 이를 참조하는 형태로 사용된다.
    - 메모리 관점에서 보면 프로그램 시작시 할당해두고 시작. 객체생성 없이 사용가능
    - `static` 메소드도 객체의 생성없이 호출이 가능함. 할당 시기의 차이로 인해 `static` 변수는 `static` 메소드에서만 접근 가능
    - 이를 활용한 singleton pattern 이라는 게 있는데, 이는 나중에 보자
- __예외처리__
    - JS 처럼 `try - catch - finally` 쓴다.
    - 다만 `catch` 하는 에러의 타입을 지정해주어야 한다는 것을 유의.
    - `Exception` 혹은 `RuntimeException`을 상속받아 오류 클래스를 만들 수 있고,
    - `throw new eception()` 과 같은 방식으로 발생시킬 수 있다.
    - 혹은 메소드 뒤에 `throws` 키워드로 윗단으로 에러 처리를 넘길 수 있다.
- __Thread__
    - 음... 당장 이번주 미션에선 필요없어보인다. 
    - 좀 있다 알아보자.