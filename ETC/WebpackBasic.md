리액트를 공부하면서, 그리고 자바스크립트로 웹 개발을 공부하며 자주 본 웹팩이란 녀석을 한번 짚고 넘어가려고 한다.

## 웹팩이란?

자바스크립트 코드로 많은 로직을 구현하다보면 몇가지 문제가 발생하게 된다. 통째로 하나의 파일에 모든 것을 구현할 수는 없기 때문에 여러 파일을 모듈별로 나누게 되는데, 이렇게 파일이 많아지면 서버-클라이언트 간에 주고 받을 파일이 많아져 불필요하게 많은 통신이 생기게 생긴다. 그리고 초기의 자바스크립트는 모듈 시스템이 없어서 다양한 모듈을 구성하다 보면 스코프를 잘 컨트롤하기 어렵다.

이를 해결하기 위한 것이 번들러이다. 번들러는 여러 모듈로 나뉜 파일을 하나로 모아주는 기능을 한다. 웹팩은 번들러 라이브러리의 일종이다.

## 설정법

우선 webpack 라이브러리를 설치하자.

```bash
npm i -g webpack webpack-cli
```

그리고 추가적으로 필요한 `loader`와 `plugin` 패키지를 설치하자.

```bash
npm i --save-dev html-loader html-webpack-plugin
```
이제 root 디렉토리에 설정 파일을 만든다.

```js
# webpack.config.js

const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/test.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build")
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
            template: './public/index.html', // public/index.html 파일을 읽는다.
      filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
    })
  ]
};
```

주의해야할 부분은 `entry`, `output`, `module`, `plugins`이다.

- `entry`: 프로젝트의 시작점이 되는 파일. 다른 모듈들을 `import` 하는 최초의 js파일이다.
- `output`: 번들링이 완료된 파일을 설정하는 부분이다. 이름과 경로를 설정했다.
- `module`: 웹팩이 js파일이 아닌 다른 파일을 읽어들이기 위한 부분이다. `module`은 각 파일별로 어떤 로더를 사용할지 설정하는 부분.
    - `test`: 읽어들일 파일을 설정하는 부분.
    - `use`: 어떤 `loader`를 사용하고 어떤 `options`을 줄지 설정하는 부분
- `plugins`: 번들된 결과물을 처리하기 위한 방법을 설정하는 부분이다. 어떤 아웃풋으로 보낼지 혹은 minify 하거나 하는 등의 설정이 가능.

## 출처

- [김정환 블로그](http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html)
- [jeff0720 velog](https://velog.io/@jeff0720/React-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD%EC%9D%84-%EA%B5%AC%EC%B6%95%ED%95%98%EB%A9%B4%EC%84%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-Webpack-%EA%B8%B0%EC%B4%88)