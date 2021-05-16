#  스위프트 문법 정리

## 변수

변수는 `var`, 상수는 `let` 키워드로 선언한다. 다만 `let`은 상수라기보다는 `js`의 `const`처럼 참조를 수정할 수 없는 변수 키워드라고 보는게 정확한 듯 하다. 따라서 재할당은 안되지만 이미 할당된 개체의 프로퍼티를 수정하는건 가능하다.

기본적으로 스위프트는 강타입언어이기 때문에 변수 선언시에 타이핑을 해주는게 기본이지만, 타입 추론을 해주기 때문에 생략도 가능하다.


## 자료형


기본 타입은 `Bool`, `String`, `Character`, `Int`, `UInt`, `Float`, `Double` 이고, 참고할 점이라면 `Bool`은 딱 `true`, `false` 만 가질 수 있다는 점.

컬렉션 타입은 `Array`, `Dictionary`, `Set` 이렇게 3가지이다. `Array`, `Dictionary` 둘 다`[ ]`을 사용한다는걸 주의하자. 

그 외에 `Any`, `AnyObject`, `nil` 도 있다. 

이러한 타입들은 모두 `struct` 로 정의된 구조체이다. 따라서 참조가 아닌 값을 복사한다.

## 함수와 클로저

`func` 키워드를 사용함. 기본적인 형태는 다음과 같음.

```swift
func 함수이름(매개변수...) -> 반환타입 { 
    // 실행 구문 
    return 반환 값 
} 
```

함수를 호출할 때 파라미터 이름을 맞춰서 인자를 넘겨줘야하는데 다양한 경우의 수가 있다.

```swift
func funciton1(name: String, age: Int) -> String {
    return ""
}
func funciton2(to name: String, age: Int) -> String {
    return ""
}
func funciton3(_ name: String, age: Int) -> String {
    return ""
}
func funciton4(_ numbers: Int...) -> String {
    return ""
}

function1(name:"이름", age:17)
function2(to:"이름", age:17)
function3("이름", age:17)
function4(1,2,3)
```

클로저는 `{}`로 감싸진 코드블럭을 가리킨다. 함수도 일종의 클로저이다.

기본적 형태는 다음과 같다.

```swift
{ (매개변수 목록) -> 반환타입 in
    실행 코드
}
```

클로저를 함수의 마지막 인자로 전달할 때에는 매개변수 이름을 생략하고 소괄호 외부에 클로저를 작성할 수 있다.

```swift
func calculate(a: Int, b: Int, method: (Int, Int) -> Int) -> Int {
    return method(a, b)
}

var result = calculate(a:10,b:10) { (left: Int, right: Int) -> Int in
    return left + right
}
```

반환값은 타입추론이 가능하다면 생략이 가능하고, 매개변수 목록은 함수와 같이 이름과 타입으로 지정해주지만 생략하고 `$n`으로 접근할 수 도 있다. 그리고, `return`도 암묵적으로 생략할 수 있다.

```swift
var result2 = calculate(a:10,b:10) { $0 + $1 }
```

## Class, Struct, Enum

클래스는 `class`, 구조체는 `struct`로 정의한다.  둘 다 어떤 데이터를 다루기위해 묶어둘 수 있고 프로퍼티와 메소드를 가진다는 공통점이 있지만, 차이점도 있다.

||클래스|구조체|
|---|---|---|
|접근|참조|값|
|변경|let으로 선언되어도 가능|구조체와 프로퍼티 모두 var로 선언된 경우에만 가능|
|상속|가능|불가능|
|deinit|가능|불가능|


열거형은 다른 언어의 enum과 많이 다른 자료형이다.

```swift
enum Weekday {
    case mon
    case tue
    case wed
    case thu, fri, sat, sun
    // 각각의 case가 고유한 값이 된다.

    func printMessage() {
        switch self {
        case .mon .tue, wed, thu, fri:
            print("평일")
        case .sat, .sun:
            print("주말")
        }
    }
    // 메소드를 가질 수 있다.
}

var day: Weekday = Weekday.mon

day = .tue
// 명확히 추론될 경우 이렇게 표기할 수 있다.


enum Fruit: Int {
    case apple = 0
    case grape = 1
    case peach

    // 정수 값을 열거할 수 도 있다. 
}

print("Fruit.peach.rawValue == \(Fruit.peach.rawValue)")
// Fruit.peach.rawValue == 2

enum School: String {
    case elementary = "초등"
    case middle = "중등"
    case high = "고등"
    case university

    // Hashable 프로토콜을 따르는 모든 값은 담길 수 있다.
}

print("School.middle.rawValue == \(School.middle.rawValue)")
// School.middle.rawValue == 중등

// 열거형의 원시값 타입이 String일 때, 원시값이 지정되지 않았다면
// case의 이름을 원시값으로 사용합니다
print("School.university.rawValue == \(School.university.rawValue)")
// School.middle.rawValue == university

// rawValue를 통해 초기화 한 열거형 값은 옵셔널 타입이다.
//let apple: Fruit = Fruit(rawValue: 0)
let apple: Fruit? = Fruit(rawValue: 0)
```

## 옵셔널

옵셔널은 값이 없을 수(`nil`일 수)도 있다는 것을 명시하는 문법이다. 옵셔널은 기존의 자료형을 감싸는 자료형이기 때문에 옵셔널로 선언된 변수는 기존 자료형처럼 사용할 수 없다. 

한번 옵셔널로 선언된 값은 항상 `nil`일 가능성을 가지고 있는 또 다른 자료형이기 때문에 한꺼풀 벗겨내는 작업이 필요하다.

`if-let`과 `optional chaining` 을 이용할 수 있다.

```swift
var optionalString : String?

optionalString = "string"

if let string: String = optionalString {
    print("string has value \(string)")
} else {
    print("string nil")
}
```

```swift
class Person {
    var name: String
    
    init (name:String){
        self.name=name
    }
}

let jake: Person? = Person(name: "Jake")

if let name: String = jake?.name {
    print("\(name) is here")
} else{
    print("not here")
}
```

## 프로토콜

프로토콜은 특정 역할을 수행하기 위한 메서드, 프로퍼티, 기타 요구사항 등의 청사진을 정의한다. 추상클래스, 인터페이스 라고 생각하면 될 것 같다.

```swift
protocol File {
    var name: String {get set}
    
    init(name:String)
}

protocol Readable: File {
    func read() -> String
}

protocol Writeble: File {
    func write(value:String)
}

class FileClass: File, Readable, Writeble {
    var name: String
    
    func read() -> String {
        return self.name
    }
    
    func write(value: String) {
        self.name = value
    }
    
    required init(name: String){
        self.name = name
    }
}

let file = FileClass(name: "file")

print(file.read())
// file
file.write(value: "new name")
print(file.read())
// new name
```