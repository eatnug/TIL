Sass(Syntactically Awesome StyleSheets)[https://sass-lang.com/]는 말 그대로 문법적으로 멋진 스타일시트를 위한 언어이다. 프로그래밍 언어로 코드를 작성하듯이 스타일 시트를 작성하여 가독성과 재사용성을 증가시킨다.

하지만 브라우저는 이를 이해할 수 없기 때문에 Sass로 작성한 파일을 트랜스파일링해서 css파일로 만들어야한다. Node.js 기준으로 실제로 사용하는 방법을 알아보자.

> Sass는 SASS표기법과 SCSS표기법으로 나뉘는데, 몇가지 문법적 차이가 있으나 Scss만 보면 될듯하므로 지금부터는 scss로 사용한다.

## 설치와 사용.

Node의 Sass 패키지인 `node-sass`를 설치하고 `node-sass source > dist` 형식의 명령어로 트랜스파일링을 수행한다.

```bash
npm i -g node-sass      
touch foo.scss
node-sass foo.scss > bar.css
```

트랜스파일링에 추가할 수 있는 옵션이 있는데 `output-style`과 `watch`를 알아보자

### output-style

생성되는 css파일의 스타일을 선택한다.

```bash
 
# scss형식과 유사하게 nested된 파일이 생선된다. 기본값
node-sass --output-style nested src/sass --output dist/css 

# 표준 스타일의 css 파일이 생성된다.
node-sass --output-style expanded src/sass --output dist/css

# 여러 룰셋을 한줄로 나타내는 스타일의 css 파일이 생성된다.
node-sass --output-style compact src/sass --output dist/css

# 가능한 빈공간이 없는 압축된 스타일의 css 파일이 생성된다.
node-sass --output-style compressed src/sass --output dist/css

```

### watch

scss 파일의 변경을 감지하여 변경될 때 마다 자동으로 트랜스파일링 한다.

```bash

node-sass --watch src/sass/foo.scss --output dist/css

```

## 출처

- [Poiemaweb](https://poiemaweb.com/sass-basics)