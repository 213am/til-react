# React 복습

## 1. publishing

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const PublishPage = () => {
  return (
    <>
      <header className="header">
        <a href="#" className="logo">
          로고
        </a>
        <nav className="gnb">메뉴</nav>
      </header>
      <main className="main">
        <div className="slide">슬라이드</div>
        <div className="content">
          <div className="notice">공지사항</div>
          <div className="banner">배너</div>
          <div className="link">바로가기</div>
        </div>
      </main>
      <footer className="footer">
        <a href="#" className="footer-logo">
          로고
        </a>
        <p className="copyright">Copyright</p>
        <div className="sns">SNS</div>
      </footer>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PublishPage />
  </StrictMode>,
);
```

## 2. component

- `/src/components/` 폴더, `/src/pages/` 폴더 생성
- 각 페이지별로 어떤 내용이 나와야할 지
- 각 페이지에 공통으로 출력될 원본 컴포넌트는 무엇이 필요한 지

## 2.1. 페이지 검토 결과

- `/src/pages/IndexPage.jsx` 생성

## 2.2. 컴포넌트 검토 결과

- `/src/components/header/Header.jsx`

- `/src/components/footer/Footer.jsx`

## 2.3. 파일 생성 후 화면에 표시한 후 세부적인 작업

- 소스 참조

## 3. css

- IndexPage.jsx 를 대상으로 복습
- `/src/styles/` 폴더 생성
- `/src/styles/pages/` 폴더 생성
- `/src/styles/components/` 폴더 생성

### 3.1. IndexPage.jsx 를 위한 css

- `/src/styles/pages/` 폴더에 `index-page.css`생성

## 4. module

- `.module.css`
- `/src/components/header/Header.jsx` 에 적용
- `/src/styles/header/` 폴더에 `header.module.css` 생성

## 5. scss

- `/src/components/footer/Footer.jsx` 에 적용
- `/src/styles/footer/` 폴더에 `footer.module.scss` 생성

## 6. object css

### 6.1. inline object css

- 객체 리터럴
- 적극적으로 사용함
- `/src/components/notice/` 폴더에 `Notice.jsx` 파일 생성

### 6.2. object 변수 생성

- 객체 리터럴
- 적극적으로 사용함
- 가능하면 `export 로 외부 파일`에서 참조하자
- `/src/styles/components/banner/` 폴더에 `banner-css.js` 파일 생성

## 7. CSS-in-JS(Emotion)

- `가능하면 컴포넌트 생성`하고, 그 컴포넌트에 적용하자
- `/src/pages/IndexPage.jsx`
- 장점

  > `<div>` 태그만으로는 구분이 어렵지만
  > 이름만 봐도 구분이 가능하다
  > 컴포넌트처럼 `재활용`이 가능하다
  > `공통으로 사용하는 경우`라면 `props` 로 조절도 가능

- 별도의 `.js` 파일 생성
