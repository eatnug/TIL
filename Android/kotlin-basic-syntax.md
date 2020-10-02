# 코틀린 기본 문법

## 패키지 정의와 임포트

패키지 명시는 소스파일 최상위에서 이루어져야 한다.

디렉토리와 패키지 네임이 반드시 일치하지 않아도 된다...?
***자바의 패키지 시스템을 알아보고 비교해보자***

```kotlin
package my.demo

import kotlin.text.*
```

## 프로그램 엔트리 포인트

엔트리 포인트는 `main` 함수이다.

```kotlin
fun main() {
    println("Hello world!")
}
```

## 함수

`Int` 형의 인자 두개를 받는 `sum` 함수는 다음과 같이 선언할 수 있다.

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```

바디부분이 표현식이고, 리턴 값 추론이 가능한 함수는 다음과 같이 선언할 수 도 있다.

```kotlin
fun sum(a: Int, b: Int) = a + b
```

값을 리턴하지 않는 경우에는 `Unit`을 타이핑 할 수 있다.

```kotlin
fun printSum(a: Int, b: Int): Unit {
    println("sum of $a and $b is ${a + b}")
}
```

그리고 해당 타입은 생략될 수 있다.

```kotlin
fun printSum(a: Int, b: Int) {
    println("sum of $a and $b is ${a + b}")
}
```

## 변수

읽기전용 지역 변수는 `val` 키워드로 선언한다. deffered assignment도 가능하지만 값의 할당이 한번만 가능하다.

```kotlin
val a: Int = 1  // immediate assignment
val b = 2   // `Int` type is inferred
val c: Int  // Type required when no initializer is provided
c = 3       // deferred assignment
```

재할당이 가능한 변수는 `var` 키워드로 선언한다.

```kotlin
var x = 5 // `Int` type is inferred
x += 1
```

최상위 변수?(전역변수인가?)는 다음과 같이 `main` 바깥 스코프에 선언할 수 있다.

```kotlin
val PI = 3.14
var x = 0

fun incrementX() { 
    x += 1 
}
```

## 주석

주석은 자바스크립트와 비슷한데, 블록 코멘트는 중첩도 가능하다.

```kotlin
// This is an end-of-line comment

/* This is a block comment
   on multiple lines. */

/* The comment starts here
/* contains a nested comment */     
and ends here. */
```

## 문자열 템플릿

```kotlin
var a = 1
// simple name in template:
val s1 = "a is $a" 

a = 2
// arbitrary expression in template:
val s2 = "${s1.replace("is", "was")}, but now is $a"
```

## 조건문

```kotlin
fun maxOf(a: Int, b: Int): Int {
    if (a > b) {
        return a
    } else {
        return b
    }
}
```

코틀린에서는 `if`가 표현식으로 작성될수도 있다.
```kotlin
fun maxOf(a: Int, b: Int) = if (a > b) a else b
```

## Nullable 값과 null 체크

null 값을 가질 수 있는 레퍼런스는 반드시 nullable 하다고 표시되어야한다. `parseInt` 를 예로 들어보자. 만약 인자로 넘어온 문자열이 숫자가 아니라면 null을 리턴하기 때문에 반환 타입에 ?가 추가되어있다.

```kotlin
fun parseInt(str: String): Int? {
    // ...
}
```

nullalbe 한 값을 반환하는 함수를 사용하는 예를 보자.

```kotlin
fun printProduct(arg1: String, arg2: String) {
    val x = parseInt(arg1)
    val y = parseInt(arg2)

    // x*y를 바로 사용할 경우 해당 값들이 nullable 하기 때문에 에러를 발생시킨다.
    if (x != null && y != null) {
        // if문 이후에 x와 y값이 non-nullable로 자동으로 캐스팅된다.
        println(x * y)
    }
    else {
        println("'$arg1' or '$arg2' is not a number")
    }    
}
```
혹은 다음과 같이 사용할 수도 있다.

```kotlin
// ...
if (x == null) {
    println("Wrong number format in arg1: '$arg1'")
    return
}
if (y == null) {
    println("Wrong number format in arg2: '$arg2'")
    return
}

// if문을 거치면서 x와 y값이 non-nullable로 자동으로 캐스팅된다.
println(x * y)
```

## 타입체킹과 자동캐스팅

`is` 연산자는 어떤 표현식이 어떤 타입의 인스턴스인지 확인하는 연산자이다. 만약 불변적인 지역객체 혹은 프로퍼티가 특정 타입에 대해 체크되었다면, 해당 타입으로 자동적으로 캐스팅 되기때문에 명시적으로 또 캐스팅 해줄 필요는 없다. 아래의 세 코드블럭은 모두 같은 내용이다.

```kotlin
fun getStringLength(obj: Any): Int? {
    if (obj is String) {
        // `obj` is automatically cast to `String` in this branch
        return obj.length
    }

    // `obj` is still of type `Any` outside of the type-checked branch
    return null
}
```
```kotlin
fun getStringLength(obj: Any): Int? {
    if (obj !is String) return null

    // `obj` is automatically cast to `String` in this branch
    return obj.length
}
```
```kotlin
fun getStringLength(obj: Any): Int? {
    // `obj` is automatically cast to `String` on the right-hand side of `&&`
    if (obj is String && obj.length > 0) {
        return obj.length
    }

    return null
}
```

## for 반복문

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
for (item in items) {
    println(item)
}
```

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
for (index in items.indices) {
    println("item at $index is ${items[index]}")
}
```

## while 반복문

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
var index = 0
while (index < items.size) {
    println("item at $index is ${items[index]}")
    index++
}
```

## when 식

swicth 문을 대체하는 듯하다.

```kotlin
fun describe(obj: Any): String =
    when (obj) {
        1          -> "One"
        "Hello"    -> "Greeting"
        is Long    -> "Long"
        !is String -> "Not a string"
        else       -> "Unknown"
    }
```

## Ranges

`in` 연산자로 정수가 어떤 범위 내에 있는지 확인할 수 있다. 그리고 `Int..Int`로 range를 생성할 수 있는 듯.

```kotlin
val x = 10
val y = 9
if (x in 1..y+1) {
    println("fits in range")
}
```

범위 외에 존재하는지도 판단할 수 있다.

```kotlin
val list = listOf("a", "b", "c")

if (-1 !in 0..list.lastIndex) {
    println("-1 is out of range")
}
if (list.size !in list.indices) {
    println("list size is out of valid list indices range, too")
}
```

범위를 순환할수도 있다.

```kotlin
for (x in 1..5) {
    print(x)
}
```

특별한 옵션을 활용할 수 도 있다. (progression? 이라고 하는 거 같은데 좀 더 알아보자)

```kotlin
for (x in 1..10 step 2) {   // 2씩 증가
    print(x)
}
println()
for (x in 9 downTo 0 step 3) { // 9에서 0으로의 순서로 순환
    print(x)
}
```

마지막 숫자를 포함하지 않으려면 `until` 키워드를 사용하면 된다.

```kotlin
for (i in 1 until 10) {       // i in [1, 10), 10 is excluded
    print(i)
}
```

## 집합 (Collection)

집합의 원소들을 순환할 수 있다.

```kotlin
for (item in items) {
    println(item)
}
```

집합이 값을 포함하고 있는지 여부도 `in` 연산자로 확인 가능하다.

```kotlin
when {
    "orange" in items -> println("juicy")
    "apple" in items -> println("apple is fine too")
}
```

람다식으로 집합을 필터링하고 매핑할 수 있다.

```kotlin
val fruits = listOf("banana", "avocado", "apple", "kiwifruit")
fruits
  .filter { it.startsWith("a") }
  .sortedBy { it }
  .map { it.toUpperCase() }
  .forEach { println(it) }
```

## 클래스와 인스턴스 객체 생성하기

```kotlin
val rectangle = Rectangle(5.0, 2.0)
val triangle = Triangle(3.0, 4.0, 5.0)
```