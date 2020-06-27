# Go-tour

### 시작하기

[공식 홈](https://golang.org/doc/install)에서 설치하고 `/usr/local/go/bin` PATH에 추가

### 패키지

모든 Go 프로그램은 패키지로 구성. 프로그램은  `main` 패키지에서 실행 시작. 패키지 이름은 디렉토리 경로의 마지막 이름을 사용하는 것이 규칙. 만약 "path/filepath"에 위치한 패키지가 있다면 패키지 명은 filepath

### Import

`import "fmt"` 형태로함. 복수의 패키지는 여러 번 import 문을 작성 할 수 도 있고 한번에 여러개 패키지를 import 할 수 도 있다.

```go
import (
    "fmt"
    "math"
)
```

### export

패키지를 import 하면 패키지가 외부로 export 한 것들에 접근할 수 있다. 이때 외부로 export 시켜서 사용가능하게 하고싶은 메서드나 변수 등은 이름이 대문자로 시작해야만한다.

### 함수

- 함수는 매개변수를 가질 수 있다. 다음 `add` 함수는 정수형의 인자 x, y를 가진다. [타입을 변수 뒤에 선언한다](https://blog.golang.org/declaration-syntax). 여러 타입의 여러 변수와 함수가 겹칠 때의 가독성을 고려한 결정인 듯 하다.
- 함수는 여러개의 결과를 반환할 수 있다. 흠... 이 여러개의 결과랑 배열이랑은 다른건가
- 함수는 매개변수 뿐 아니라 반환값에도 이름을 지정할 수 있는데, 이때는 빈 `return` 으로 해당 반환값의 현재 값을 반환한다.

```go
package main

import "fmt"

func add(x int, y int) int {
    return x + y
}

func swap(x, y string) (string, string) {
    return y, x
}

func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}


func main() {
    fmt.Println(add(42, 13))
    a, b := swap("hello", "world")
    fmt.Println(a, b)
    fmt.Println(split(17))
}
```

### 변수

- 변수 선언은 var 키워드를 사용한다. 타입은 매개변수 처럼 끝에 사용한다.
- 변수 선언과 함께 각가을 초기화 할 수 있다. 초기화 하는 경우 타입을 생략할 수 있다.
- __함수 내에서__ `:=` 연산자를 사용하면 var과 명시적인 타입을 생략할 수 있다. ( 스코프 개념은 어떻게 되는걸까)

```go
package main

import "fmt"

var a, b, c int
var kor, eng, esp bool
var x, y, z int = 1, 2, 3
var c, python, java = true, false, "no!"
some, short, variable := true, 1, "yes"

func main() {
    fmt.Println(a, b, c, kor, eng, esp)
    // 0 0 0 false false false
    fmt.Println(x, y, z, c, python, java)
}
```

### 상수

- 상수는 `const` 키워드와 함께 변수 처럼 선언. `문자, 문자열, 부울, 숫자` 타입 중의 하나가 될 수 있다.
- 숫자형 상수는 정밀한 값을 표현할 수 있다. 타입을 지정하지 않은 상수는 문맥에 따라 타입을 가지게 된다.

```go
package main

import "fmt"

const Pi = 3.14
const (
    Big   = 1 << 100
    Small = Big >> 99
)

func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
    return x * 0.1
}

func main() {
    fmt.Println("Hello", Pi)
    fmt.Println(needInt(Small))     // 21
    fmt.Println(needFloat(Small))   // 0.2
    fmt.Println(needFloat(Big))     // 1.2676506002282295e+29
}
```

### 반복문

- Go에는 반복문이 for밖에 없다. C와 비슷하나 소괄호가 없다.
- 전후 처리 생략하고 조건문만 표현할 수 있다. while과 똑같은 듯.
- 조건문 마저 생략하면 무한 루프가 만들어진다.
```go
package main

import "fmt"

func main() {
    sum := 0
    for i := 0; i < 10; i++ {
        sum += i
    }

    secondSum := 0
    for secondSum < 1000 {
        secondSum += secondSum
    }

    fmt.Println(sum)
    fmt.Println(secondSum)
}
```

### 조건문

- 조건문도 C와 비슷하고 소괄호를 제외한다.

```go
package main

import (
    "fmt"
    "math"
)

func sqrt(x float64) string {
    if x < 0 {
        return sqrt(-x) + "i"
    }
    return fmt.Sprint(math.Sqrt(x))
}

func main() {
    fmt.Println(sqrt(2), sqrt(-4))
}
```
- if 내부 스코프에서만 쓸 수 있는 변수를 선언하며 사용할 수 있다.
- 해당 변수는 else 스코프에서도 사용할 수 있다.
```go
package main

import (
    "fmt"
    "math"
)

func pow(x, n, lim float64) float64 {
    if v := math.Pow(x, n); v < lim {
        return v
    }
    return lim
}

func main() {
    fmt.Println(
        pow(3, 2, 10),
        pow(3, 3, 20),
    )
}
```

### 연습: 루프와 함수

뉴턴의 방법을 이용해 제곱근 함수를 구현하기.

초기 값 z를 선택한 후에 `z = z - (z * z - x) / (2 * z)` 식을 반복적으로 사용해 값이 더 이상 변하지 않을 때 까지 나아가면 제곱근의 근사값을 얻을 수 있다는 알고리즘이다.

```go
package main

import (
    "fmt"
    "math"
)

func Sqrt(x float64) float64 {
    const diff = 1e-6
    var tmp float64
    for z:=1.0;;{
        z, tmp = z - (z*z - x) / (2*z), z
        if math.Abs(tmp-z) < diff {
            return z
        }
    }
}

func main() {
    fmt.Println(Sqrt(10))
    fmt.Println(math.Sqrt(10))
    fmt.Println(Sqrt(100))
    fmt.Println(math.Sqrt(100))
}
```
