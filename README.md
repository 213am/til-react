# React 컴포넌트 만들기

## 1. 컴포넌트란?

- 웹페이지의 `각 요소 중` 재활용이 되는 내용을 별도의 `.jsx`로 생성한 것
- (예시) Header.jsx, Footer.jsx 등

</br>

## 2. `Component` 와 `Page` 의 구분

- 수업 중 `Page` 라고 말하는 것은 `Component` 들을 모아서 하나의 페이지를 구성하는 것
- 추후 `pages` 폴더와 `components` 폴더를 생성해 분리
- `폴더명은 무조건 소문자` - window 에서는 대소문자 구분을 안하기 때문에

</br>

## 3. 컴포넌트의 이해

### 3.1. html 을 React 에서는 `jsx`라고 함

- `js 로 html 을 생성`하는 역할
- 함수명은 대문자로 시작하는 `PascalCase`
- jsx 를 출력하는 함수는 `PascalCase` 를 써야한다는 규칙이 존재
- jsx 를 출력하는 함수는 반드시 `return ( )` 구문이 있어야 한다는 규칙이 존재
- `( ) 안쪽에 html` 형식을 작성
- jsx 는 `html 태그 형식`으로 호출(call)
- jsx 는 반드시 `root 태그`가 존재해야 함
- 묶음을 만드는 것 외에는 용도가 없는 root 라면 `<> </> Fragment` 로 묶어준다

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function IndexPage() {
  return (
    <>
      <header>상단</header>
      <main>메인</main>
      <footer>하단</footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IndexPage />
  </StrictMode>,
);
```

### 3.2. 각 `화면의 기능`에 따라서 파일을 분리

- `협업`을 해야하므로 각 기능별 단위마다 `별도의 component` 관리 필요
- `/src/pages/` 폴더에는 URL 주소에 맞는 페이지 배치
- `/src/components/` 폴더에는 각각의 페이지에 배치될 html 요소들 배치
- `/src/main.jsx`

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IndexPage from "./pages/IndexPage";
// import CeoPage from "./pages/CeoPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IndexPage />
    {/* <CeoPage /> */}
  </StrictMode>,
);
```

- `/src/pages/IndexPage.jsx`

```jsx
import Footer from "../components/Footer";
import Header from "../components/Header";

function IndexPage() {
  return (
    <>
      <Header />
      <main>
        <div>공지사항 / 갤러리</div>
        <div>배너</div>
        <div>바로가기</div>
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;
```

- `/src/components/Header.jsx`

```jsx
const Header = () => {
  return (
    <header>
      <a href="#">로고</a>
      <div>
        <ul>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
```

- `/src/components/Footer.jsx`

```jsx
const Footer = () => {
  return (
    <footer>
      <a href="#">로고</a>
      <div>카피라이터</div>
      <div>SNS</div>
    </footer>
  );
};

export default Footer;
```
