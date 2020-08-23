# Road to Rome #1

Rome은 JavaScript, TypeScript 프로젝트를 위한 린터, 컴파일러 그리고 그 이상의 기능들을 제공한다. Babel, ESLint, webpack, Prettier, Jest 등 다양한 도구들을 대체하고자 하는데, 한 프로젝트를 위해 린팅, 포매팅, 테스팅 등의 다양한 기능이 다양한 도구들에게 위임되어있던 상황을 해결하고 이를 통합하기위한 도구이다.

## how to start

시작하는 방법은 평범하다. 한가지 친절하다고 느낀 점은 이미 존재하는 프로젝트에 추가하는 방법을 따로 알려준다는 것.

```bash
npm i -g rome

mkdir rome_101
cd rome_101
rome init

# or apply rome to existing project

rome init --apply
```

## Lint

코드 린팅을 위한 명령어는 `check` 이다. rome은 이 부분에서 오류가 발생할 경우 사용자에게 최대한 많은 정보를 제공하려고 노력하는 듯하다. 또한 명령어의 활용 옵션도 `--watch`, `--review`, `--format-only` 등 다양하다.

린트 룰은 타입스크립트와 리액트를 위한 보편적인 룰들을 포함한 100개정도가 있는데 **_기본적으로 활성화 되어있으며, 비활성화시킬 수 없다._** Suppression 이라는 것들로 특정 린트 에러를 숨길 수 있다.

린터를 적용하기 위해는 포매터도 사용해야 하는데, 린트 오류를 수정하기 위한 강력한 포매터를 가지고 있다.

### | Fix

rome이 제시하는 fix에는 `safe fix`와 `suggested fix`가 있다. 전자는 말 그대로 rome 포매터가 자동으로 수정해도 안전한 사항이라서 `rome check --apply`로 적용할 수 있다. 후자의 경우에는 수정할 방법이 여러가지이거나 자동적으로 수정하는 것이 위험할 경우인데, 이때는 `rome check`후에 보여주는 diagnostics에서 알려준다.

### | Review, Suppressions, ...

`--review` 플래그를 사용해서 린팅을 하면 발생한 에러에 대해서 어떤 액션을 취할지 선택할 수 있다. 그리고 모든 에러는 각각에 대한 설명과 어떤 행동을 취해야 하는지 등에 대한 정보를 담은 diagnotics 를 가진다. 또 특정한 린트 룰을 무시하고 싶다면 `eslint-disable` 처럼 주석 처리된 `rome-ignore <category> <possilbe other category>: <reason why supress>` 이런 형태의 메시지를 파일에 추가하면 된다.

## CLI

- `rome check`
- `rome config`
- `rome init`
- `rome recover`
- `rome start`, `rome stop`

위와 같은 커맨드들이 있고, shell completion도 추가할 수 있다.

## Project configuration

`name`, `extends`, `root` 등의 명령어로 프로젝트 세팅이 가능하다.

설정 파일은 `.config/rome.rjson`이나 `./config/rome.json` 또는 `pakage.json.rome`에 위치시킬 수 있다.

## rjson

좀 더 간소화되고 주석도 달 수 있는 json 포맷인 rome-json을 사용한다.
