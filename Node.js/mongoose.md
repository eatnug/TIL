Mongoose는 Node 환경에서 mongoDB를 사용하기 위한 ODM 라이브러리이다.

ODM이란 `Object-Document Mapping`의 약자로, 장고의 ORM과 마찬가지로 우리가 사용하는 프로그래밍 언어에서의 **객체**와 데이터베이스의 **자료**(mongodb에서는 **Document**)를 매핑해주는 것이다.

간단히 말해서 JSON으로 데이터베이스와 소통할 수 있게 해주는 놈이다. 설치는 `npm install mongoose` 혹은 `yarn add mongoose`면 된다. 간단하다.

이를 mongoDB와 연결해보자.

>db.js

```js
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("➡️ connected to DB");
const handleError = (err) => console.log(`❌ Error on DB Connection : ${err}`);

db.once("open", handleOpen);
db.on("error", handleError);
```

`mongoose.connect()` 메소드로 `mongoose` 객체와 내 mongoDB 서버를 연결할 수 있다. 파라미터로는 `(mongoDB_URL, options)` 값을 받고, `mongoose.connection` 으로 실제 db를 사용할 수 있다. 혹은 `connect()`의 리턴값으로도 쓸 수 있는 듯?

사실 mongoDB는 자체 클라이언트에서 이미 js 문법을 지원한다. 그렇다면 왜 `mongoose`가 필요할까?

mongoose는 그냥 mongoDB에 더해 schema와 populate, promise 기능을 지원한다. 우선 schema에 대해 알아보자


## Schema

### 스키마와 모델

스키마는 어떤 형태로 자료를 저장할지에 대한 구조이다. 이러한 구조를 이용해 만든 인스턴스가 모델이다. 실제 데이터베이스와 상호작용 할 때는 모델을 통한다.

mongoDB는 schema-less 한 DB이지만, 필요할 때가 있다?고 하더라. 그래서 스키마를 사용할 수 있게 만들어뒀다. 

데이터를 DB에 저장하기 전에 `mongoose`가 먼저 스키마를 기준으로 검사한다. 인덱스를 설정할 수도 있다.

> model.js

```js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

export default mongoose.model('book', bookSchema);
```

`new mongoose.Schema({field: condition})` 형태로 선언하면 스키마가 생성되고, `mongoose.model(collectionName, schema)` 형태로 모델이 만들어지고 데이터베이스에 컬렉션을 생성한다. 컬렉션 이름은 `collectionName`을 소문자, 복수형으로 지정하는데 세번째 인자로 임의로 지정할 수도 있다.

`condition` 부분은 해당 필드의 제약사항을 설명하는 객체인데 `type, required, default, ref` 등의 키를 갖는다. 혹은 객체 없이 타입 값만 명세할 수도 있다.

### 모델 메소드

모델을 불러와서 실제 쿼리를 날릴 수 있는데, 몽구스가 여러가지 메소드를 제공해준다.

```
model.find(조건, 프로젝션, 콜백)
model.findOne(조건, 프로젝션,콜백)
model.findById(아이디, 프로젝션, 콜백)
model.findOneAndRemove(조건,콜백)
model.findOneAndUpdate(아이디,콜백)
...
```
