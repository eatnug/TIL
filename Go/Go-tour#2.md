# Go-tour

### 자료형

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // uint8의 다른 이름(alias)

rune // int32의 다른 이름(alias)
     // 유니코드 코드 포인트 값을 표현합니다. 

float32 float64

complex64 complex128
```

### 구조체

- `type` 선언으로 struct 이름을 지정할 수 있다.
- go에는 포인터가 있지만 포인터 연산은 불가능하다.
- 구조체 변수는 구조체 포인터를 이용해서 접근할 수 있다. 포인터를 이용하는 접근은 실 구조체에도 영향을 미친다.
- 구조체 리터럴. 즉 필드와 값을 나열해서 구조체를 선언할 수 있음. &접두어로 리터럴에 대한 포인터도 생성할 수 있는데... 어디쓰지?
- new 함수는 모든 필드가 0(zero value)이 할당된 T 타입의 포인터를 반환한다.
- zero value는 숫자에서는 0, 참조 타입에서는 nil을 뜻한다.

```go
package main

import "fmt"

type Vertex struct {
    X int
    Y int
}

var (
    p = Vertex{1, 2}  // has type Vertex
    q = &Vertex{1, 2} // has type *Vertex
    r = Vertex{X: 1}  // Y:0 is implicit
    s = Vertex{}      // X:0 and Y:0
)



func main() {
    v := Vertex{1,2}
    v.X = 4
    fmt.Println(v.X)     // 4

    p := Vertex{1,2}
    q := &p
    q.x = 1e9
    fmt.Println(p)      // {1e9 2}

    // var t *Vertex = new(Vertex) 아래 코드와 같음
    t := new(Vertex)
}
```

### 슬라이스

- 슬라이스는 배열의 값을 가리킨다(point). 그리고 배열의 길이를 가지고있다.
- []T는 타입 T를 가지는 요소의 슬라이스이다.
- 슬라이스를 자르거나 새로운 슬라이스를 만들 수 있다.
- make 함수로 슬라이스를 만들 수 있다. 이렇게 생선된 슬라이스는 0을 할당한 배열을 생성하고, 그것을 참조한다.
- make 함수의 세번째 매개변수로 용량을 제한할 수 있다. 
- cap이 변하는 거 같은데... 잘 모르겠다 ㅜ
- 슬라이스의 zero value는 nil이다. 즉 슬라이스는 참조이다.

```go
package main

import "fmt"

func main() {
    p := []int{2, 3, 5, 7, 11, 13}
    fmt.Println("p ==", p)

    for i := 0; i < len(p); i++ {
        fmt.Printf("p[%d] == %d\n",
            i, p[i])
    }

    fmt.Println(p[1:4])  // [3 5 7]

    // missing low index implies 0
    fmt.Println(p[:3])  // [2 3 5]

    // missing high index implies len(s)
    fmt.Println(p[4:])  // [11 13]

    a := make([]int, 5)         // len=5 cap=5 [0 0 0 0 0]
    b := make([]int, 0, 5)      // len=0 cap=5 []
    c := b[:2]                  // len=2 cap=5 [0 0]
    d := c[2:5]                 // len=3 cap=3 [0 0 0]
}
```

### 레인지

- for 반복문에서 range를 사용하면 슬라이스나 맵을 순회할 수 있다.
- 이때 `_`를 이용해서 인덱스나 값을 무시할 수 있다. 

```go
package main

import "fmt"

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
    for i, v := range pow {     // index랑 value가 나오나봄
        fmt.Printf("2**%d = %d\n", i, v)
    }

    pow2 := make([]int, 10)
    for i := range pow2 {
        pow2[i] = 1 << uint(i)
    }
    for _, value := range pow2 {
        fmt.Printf("%d\n", value)
    }
}
```

### 연습: 슬라이스

- range 를 활용해 이중 배열의 원소를 채워넣는 문제였다.

```go
package main

import "code.google.com/p/go-tour/pic"

func Pic(dx, dy int) (doubleArray [][]uint8) {
    doubleArray = make([][]uint8, dy)

	for x := range doubleArray {
		doubleArray[x] = make([]uint8, dx)
		for y := range doubleArray[x] {
			doubleArray[x][y] = uint8(1+x*y)
		}
	}
    
    return
}

func main() {
    pic.Show(Pic)
}
```
