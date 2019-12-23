## MongoDB

대표적인 NoSQL DB. 

NoSQL이란 SQL로 대표되는 RDBMS의 한계를 극복하기위한 새로운 형태의 데이터베이스이다. 그렇기 때문에 NoSQL은 기존 RDBMS와 그 구성이 다르다.

mongodb는 NoSQL 중에서도 Document-Oriented 데이터베이스인데, 이 Document란 JSON과 같은 key-value 형태의 데이터 구조이다. 기존 RDBMS의 record에 해당한다.

RDBMS와 mongodb를 구성하는 요소들을 간단히 비교하면 다음과 같다.

|RDBMS|mongodb|
|---|---|
|Table|Collection|
|Row|Document|
|Column|Field|

## 특징

- schema-less 하다. 고정된 스키마가 존재하지 않아서, 같은 Collection 내에있는 Document가 각각 다른 스키마를 가질 수 있다.
- ...

## 사용법

mongodb를 설치하고 PATH 에 추가한다.

```bash
$ mongod  # mongodb 서버를 실행한다
$ mongo   # mongodb 클라이언트를 실행한다.
```

```bash
$ use mongo-ex      # mongo-ex 라는 db 생성
switched to db mongo-example

$ db                # 현재 사용중인 db 출력

$ show dbs          # db 목록 출력
mongo-example
```

CRUD도 이런식으로 커맨드로 가능하고, 특이한 점은 js 문법을 이해하기 때문에 `for`로 순회가 가능하다.

하지만 실제로 CRUD 작업은 다른 언어의 코드속에서 작성할 것이므로 넘어간다.

[mongodb in node: mongoose]()