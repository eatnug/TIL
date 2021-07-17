# ORM 패턴 - Active Record vs Data Mapper

Active Record 와 Data Mapper 패턴을 TypeORM의 예제와 함께 알아보자.

## Active Record 패턴

Active Record 패턴은 모든 쿼리 메소드를 모델 그 자체에 선언하고, 객체의 CRUD를 모델 메소드로 구현하는 것이다. 간단하게 말해 모델을 통해 데이터베이스에 접근하는 방식이다. 코드로 확인해보자.

```ts
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User extends BaseEntity {
       
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    isActive: boolean;

}
```

TypeORM 에서 모든 active-record 엔티티는 `BaseEntity`를 상속하는데, 해당 객체는 기본적으로 필요한 메소드들을 가지고 있다. 

```ts
// example how to save AR entity
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.isActive = true;
await user.save();

// example how to remove AR entity
await user.remove();

// example how to load AR entities
const users = await User.find({ skip: 2, take: 5 });
const newUsers = await User.find({ isActive: true });
const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });
```

`BaseEntity` 는 표준 `Repository`의 메소드 대부분을 포함하고있어서 active-record 엔티티를 사용할 때에는 `Repository`나 `EntityManager`를 사용할 거의 없다.

first name과 last name으로 사람을 찾아서 반환하는 메소드를 만든다고 해보자. 다음과 같이 `User` 클래스의 스태틱 메소드로 만들면 된다.

```ts
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User extends BaseEntity {
       
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    isActive: boolean;
    
    static findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

}
```

그리고 일반적인 메소드와 같이 사용하면 된다.

```ts
const timber = await User.findByName("Timber", "Saw");
```

## Data Mapper 패턴

Data Mapper 패턴에서는 모든 쿼리 메소드를 repository 라는 분리된 클래스에 작성하고, 이 repository를 통해 CRUD를 수행한다. 이러한 접근법에서 Entity는 정말 딱 스펙만 담고있고 active 하지 못하다.(원문에서는 dumb 하다고 표현함)

간단히 말하면 리포지토리를 통해 데이터베이스에 접근하는 패턴이다.

```ts
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
       
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    isActive: boolean;

}
```

```ts
const userRepository = connection.getRepository(User);

// example how to save DM entity
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.isActive = true;
await userRepository.save(user);

// example how to remove DM entity
await userRepository.remove(user);

// example how to load DM entities
const users = await userRepository.find({ skip: 2, take: 5 });
const newUsers = await userRepository.find({ isActive: true });
const timber = await userRepository.findOne({ firstName: "Timber", lastName: "Saw" });
```

아까 만들었던 것과 동일한, first name과 last name으로 유저를 찾는 함수를 만들어보자.

```ts
import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository()
export class UserRepository extends Repository<User> {
       
    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

}
```
그리고  다음 처럼 사용하면 된다.
```ts
const userRepository = connection.getCustomRepository(UserRepository);
const timber = await userRepository.findByName("Timber", "Saw");
```

## 그렇담 언제 어떤 패턴을 사용해야 하는가?

결국 늘 겪는 문제인 것 같다. 가볍고 빠르게 가는 방법은 저렴하지만 멀리가지 못한다. Active Record 패턴은 직관적이며 사용하기 쉽고 작은 사이즈에서 관리가 효율적이다. Data Mapper 패턴은 데이터베이스와 모델이 분리되어있기 때문에 훨씬 포멀하다. 하지만 그 덕에 엔티티들과 비즈니스 로직을 격리할 수 있고 어플리케이션이 커지고 복잡해질 수록 관리가 용이해진다.

### 어떤 앱을 만들 것인가?

__CRUD based VS Domain based__

__CRUD based__ => Active Record

__Domain based__ => Data Mapper

### 어떤 환경에서 실행될 앱인가.

__MVP 앱 vs 레거시가 존재하는 앱__

__새시장에서 테스트하기 위한 MVP 앱__ => Active Record

__레거시 시스템에서 새 앱을 만들 때__ => Data Mapper