# React 컴포넌트 만들기

- html 즉, jsx 작성하기

## 1. 컴포넌트에 css 추가하기

- css 폴더에 css 파일들을 모아서 사용하는 경우가 많음
- 개인적 추천
  > jsx 파일이 있는 곳에 css 파일도 같이 두기를 권장
  > css 규칙은 컴포넌트명과 동일한 css 파일명(모두 소문자)을 권장

## 2. css 추가 및 적용하는 법

### 2.1. css 라이브러리 활용

- `index.html` 에 `link` 권장

  > `reset.css`
  > : https://meyerweb.com/eric/tools/css/reset/
  > : 추후 `npm install` 활용해서 사용가능
  >
  > `namalize.css`
  > : https://necolas.github.io/normalize.css/
  > : 추후 `npm install` 활용해서 사용가능
  >
  > `font awesome`( 아이콘 글꼴 )
  > : https://cdnjs.com/libraries/font-awesome
  > : 추후 `npm install` 활용해서 사용가능
  >
  > `google font`
  > : https://fonts.google.com/
  > : 추후 `index.css` 에 작성해서 활용

### 2.2. 전체 css 에 `공통 적용`이 필요한 경우

- `/src/index.css` 를 활용하기를 권장

```css
:root {
  --primary-color: #000000;
  --secondary-color: #0000ff;
  --font-size-base: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: #000000;
}
ul,
li {
  list-style: none;
}
html {
  font-size: 16px;
}
body {
  font-size: var(--font-size-base);
  color: var(--primary-color);
}
/* 웹서비스 개발시 권장함.(개인적으로) */
html,
body,
:root {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
```

- 다른 방법으로는 `scss` 를 활용하는 방법

### 2.3. `module.css` 방식

- `협업을 할 것` 이라는 가정

- 협업시 `css 의 우선권 문제`가 발생하여 원활한 css 작업이 어려움

- 최소 `컴포넌트명.module.css` 를 준수하기를 권장
  > 예시 `/src/components/footer.module.css`

```jsx
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.layout}>
        <a href="#">로고</a>
        <div>copyright</div>
        <div>SNS</div>
      </div>
    </footer>
  );
};

export default Footer;
```

```css
footer {
  background-color: aquamarine;
}

.layout {
  background-color: brown;
}

.layout a {
  color: aliceblue;
}
```

- 다른 방법으로는 `scss` 를 활용하는 방법
- `JavaScript Object` 를 활용한 css 적용 방법

### 2.4. `SCSS` 방식

- 소스관리가 편함
- css 를 체계적으로 구성
- css 에 프로그래밍적 요소로 작성 가능(변수, mixin:함수 등)

#### 2.4.1. 환경구성

```bash
npm i -D sass
```

- Extensions 에서 `Live Sass Compiler` 설치

#### 2.4.2. 기본 문법의 이해

- `/src/scss/` 폴더 생성 권장
- `/src/scss/test.scss` 파일 생성( 확장자 확인 )

#### 2.4.3. 중첩 문법 ( Nesting )

```scss
.wrap {
  position: relative;

  .notice {
    width: 500px;

    ul {
      li {
        background-color: blue;
      }
    }
  }
  .slide {
    width: 200px;
  }
  .banner {
    width: 300px;
  }
}
```

#### 2.4.4. 변수

```scss
$width-screen: 1680px;
$pc-screen: 1024px;
$tobile-screen: 760px;
$color-bg: blue;

.wrap {
  position: relative;
  width: $width-screen;
  .notice {
    width: $pc-screen;

    ul {
      li {
        background-color: $color-bg;
      }
    }
  }
  .slide {
    width: $mobile-screen;
  }
  .banner {
    width: 300px;
  }
}
```

#### 2.4.5. 변수는 별도의 파일로 관리

- `_파일명`으로 만들면 `.css`, `css.map` 생성을 방지

```scss
$width-screen: 2000px;
$pc-screen: 1024px;
$mobile-screen: 760px;
$color-bg: yellow;
```

- 변수 사용시 `@import "파일명"` 사용

```scss
@import "value";

.wrap {
  position: relative;
  width: $width-screen;
  .notice {
    width: $pc-screen;

    ul {
      li {
        background-color: $color-bg;
      }
    }
  }
  .slide {
    width: $mobile-screen;
  }
  .banner {
    width: 300px;
  }
}
```

#### 2.4.6. Mixins 사용하기(함수)

- 파일명에 `_`를 활용(`_mixins.scss`)

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin border-fn($color) {
  border: 5px solid $color;
}
```

```scss
@import "value";
@import "mixins";

.wrap {
  position: relative;
  @include flex-center;
  width: $width-screen;
  .notice {
    @include flex-center;
    width: $pc-screen;

    ul {
      li {
        @include flex-center;
        @include border-fn(red);
        background-color: $color-bg;
        &:hover {
          background-color: pink;
        }
      }
    }
  }
  .slide {
    @include flex-center;
    width: $mobile-screen;
  }
  .banner {
    @include flex-center;
    width: 300px;
  }
}
```

#### 2.4.7. `module.scss` 만들기

- `header.module.scss` 파일 생성
