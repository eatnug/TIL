css 빠르게 한번 훑어보자.

[Selector 연습](https://flukeout.github.io/)

- 가상 클래스 선택자: active, focus등 특정 상태에서의 스타일을 변경
- 크기 단위
    - px: 픽셀, 고정크기, 사용자가 폰트 크기 설정을 바꿔도 변하지 않음.
    - em: 가변크기, 상위 요소에서의 값을 1em으로
    - rem: 문서의 최상위요소, html요소의 크기를 1rem으로 갖는 가변크기.
- 속성
    - `display`
        - `inline`: 줄바꿈 되지않고, `width`, `height` 지정 x.
        - `block`: 줄바꿈 됨. 한 라인을 다 차지
        - `inline-block`: 줄바꿈은 되지않지만, 크기지정 가능 
    - `box-sizing`
        - 박스를 어떻게 그릴지에 대한 설정
        - 기본값은 `content-box`
        - `content-box`: `width`에 `padding`, `border-width`가 더해져서 그려짐
        - `border-box`: 모든 값 다 합쳐서 `width`가 되게끔 그려짐
    - `float`
        - 이미지를 띄워서 텍스트와 함께 배치할 때 사용한다.
        - `inherit`: 부모 요소에서 상속
        - `left`: 왼쪽에 부유하는 블록박스 생성
        - `right`: 오른쪽에 부유하는 블록박스 생성
    - `clear`
        - `float` 속성을 통해 부유시킨 이후 문서의 흐름을 제거하기 위해 쓰인다.
    - `position`
        - 어떻게 위치시킬지 정의하는 속성
        - `static`: 기본값, 다른 캐그와의 관계에 의해 자동배치
        - `absolute`: 절대 좌표로 위치 지정
        - `relative`: 원래있던 위치 기준으로 좌표 지정
        - `fixed`: 스크롤 상관없이 문서 최좌측상단 기준으로 좌표 고정
        - `inherit`: 상속
- 레이아웃
    - `flex`
        - `display` 속성의 값임.
        - 박스를 생성한다고 생각하면 된다.
        - 하위의 아이템들을 일정한 규칙에 따라 배치한다.
        - 방향과 간격 등 조절 가능

