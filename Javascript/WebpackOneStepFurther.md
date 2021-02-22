[WebpackBasic](./WebpackBasic.md)에 이어서, `module`과 `plugins`에 대해 더 알아보자.

## `module`

`webpack.config.js`에서 `module`은 번들링에 사용할 로더를 결정하는 부분이다. 로더란 자바스크립트가 아닌 파일을 웹팩이 이해하고 번들링 할 수 있게 해주는데, CSS 파일을 위한 `css-loader`, SASS 파일을 위한 `sass-loader` 그리고 자바스크립트 파일 이지만 es6 이상의 최신 문법을 쓰는 경우 이를 트랜스파일링 하기 위한 `babel-loader` 등이 있다.

코드를 살펴보자

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

위의 예제에서는 `*.js` 형식의 파일은 `babel-loader`를 사용해서 트랜스파일링 할 것인데 `node_modules` 경로는 제외하고, 로더 옵션으로는 `preset-env`를 사용한다. `*.css` 파일에는 `style-loader`와 `css-loader`를 사용한다.

## `plugins`

플러그인은 번들된 파일을 어떻게 처리할지에 대한 설정이다. 가장 대표적으로는 처리된 자바스크립트 파일을 난독화하는 `UglifyJSPlugin`이 있다.

```js
plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    ]
```

이 외에도 css 파일을 따로 분리해내거나 하는 작업을 위한 플러그인도 있다.

## 출처

- [김정환 블로그](http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html)
- [jeff0720 velog](https://velog.io/@jeff0720/React-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD%EC%9D%84-%EA%B5%AC%EC%B6%95%ED%95%98%EB%A9%B4%EC%84%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-Webpack-%EA%B8%B0%EC%B4%88)