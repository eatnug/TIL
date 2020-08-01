## 대칭키 & 공개키

- 대칭키: 같은 키로 암호화 복호화
- 비대칭키: 공개키-비공개키 페어로, 각각으로 암호화한 건 상대방으로 복호화가능

## HTTP, HTTPS, HTTP2?

- HTTP: 인터넷에서 클라-서버 리소스 주고받는 프로토콜
    - TCP 기반 Stateless 연결방식
    - HTTP 3.0은 UDP 라고 하던데,,,
- HTTPS: HTTP + SSL (Secure Socket Layer)
    - 공개키 암호화 방식 사용
    - 사용자가 서버 공개키로 암호화해서 전송
    - 서버가 서버 개인키로 복호화

## 로드밸런싱

- 서버에 부하가 늘어나면
    - 성능을 올리는 scale-up 이나, 여러대를 돌리는 scale-out을 할 수 있다.
    - scale-out 한 여러 서버사이에 부하를 분산시켜주는 것을 로드 밸런싱이라고 함
    - 여러대 돌리는게 무중단 서비스 제공가능해서 스케일아웃하는걸 선호하는 듯?
- RR, Least Connection 등 뭐 생각 가능한 스케쥴링 알고리즘 같은 것들 

## Non Blocking IO

- 일단 I/O는 커널레벨에서만 할 수 있다. 프로세스(크롬 탭은 프로세스임.),쓰레드에서 시스템콜?로 커널에 I/O 요청할 듯
- Blocking
    - 프로세스가 Syscall 해서 I/O 요청
    - 완료 기다리고 진행
    - 다른 일 못함
    - 클라이언트 별로 thread를 생성해야한다 -> 사용자마다 만드니까 CTX-SWITCH 오버헤드가 커진다.
- Non Blocking
    - 프로세스가 계속 요청을하는거다.
    - 요청해서 아직 I/O가 안되었으면 아직안되었다고 리턴을 받고
    - 되었으면 제대로 리턴을 받는거지.
    - OS에서 polling 하는거같아 
    - 왜 interrupt 안하지?

## CORS

- Cross Origin Resource Sharing
- 도메인 또는 포트가 다른 서버의 자원을 요청하는 매커니즘
- same-origin policy 때문에 보통 거절되곤한다.
- cross-origin HTTP 요청으로 진행된다.
- 서버가 이를 허용한 경우에 받아올 수 있게.
- Access-Control-Request-Method
- Access-Control-Request-Headers

## 쿠키와 세션

- 쿠키는 서버에서 보내서 브라우저를 통해 클라이언트 쪽 로컬에 저장
- 세션은 로컬에 세션아이디만 넘기고 정보는 서버쪽에 저장

## REST

- REpresenational State Transfer
- 자원의 표현에 의한 상태 전달
- URI로 자원을 명시, Method로 동작(CRUD)을 명시
- 자원, 행위, 표현으로 이루어짐
- 표현은 자원의 형태인듯. - JSON, XML, ...

## ETC

- Q. 브라우저 주소창에 http://www.test.com 입력 후 엔터를 눌렀을 때 부터 페이지가 렌더링되는 과정을 상세히 설명하세요.
    - local DNS 서버에게 www.test.com에 해당하는 ip주소가 있는지 물어본다. 있다면 바로 해당 ip로 받아온다.
    - local DNS 서버에 없다면 루트 DNS 서버에 물어본다. 있다면 바로 해당 ip로 받아온다.
    - 루트 DNS 서버에 없다면 .com 을 관리하는 DNS 서버에 물어본다. 있다면 바로 해당 ip를 받아온다.
    - .com 을 관리하는 DNS 서버에 없다면, test.com을 관리하는 DNS 서버에 물어본다. 있다면 바로 해당 ip를 받아온다.
    - 목적지의 ip를 알게되었으니 TCP 통신을 통해 소켓을 개방한다.
    - HTTP 프로토콜로 요청한다.
    - 만약 라우팅 중 프록시 서버를 만난다면 웹 캐시에 저장된 정보를 response 받는다.
    - 프록시 서버를 만나지 못해 www.test.com을 서빙하는 서버까지 간다면 서버에서 요청에 맞는 데이터를 response로 전송한다.
    - 브라우져의 loader가 해당 response를 다운로드할지 말지 결정을한다.
    - 브라우져의 웹 엔진이 다운로드한 .html 파일을 파싱하여 DOM 트리를 결정한다.
    - .html 파싱중 script 태그를 만나면 파싱을 중단하는 것이 원칙(지연 가능).
    - script 태그에 있는 자원을 다운로드 하여 처리가 완료되면 다시 파싱을 재개한다.
    - CSS parser가 역시 .css 파일을 파싱하여 스타일 규칙을 DOM 트리에 추가하여 렌더 트리를 만든다.
    - 이 렌더트리를 기반으로 브라우져의 크기에 따라 각 노드들의 크기를 결정한다.
    - 페인트한다 : 렌더링 엔진이 배치를 시작한다.