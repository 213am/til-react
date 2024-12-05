# Router 참고 처리 사항

- 현재 모든 jsx 파일을 불러들이는 것은 부하가 크다
- 동적 로딩

## 1. lazy

- 낯선 문법이라 잘 보고 적응해야함

```jsx
import AboutPage from "./pages/about/Index";
```

```jsx
const AboutPage = lazy(() => import("./pages/about/Index"));
```

## 2. Suspense

```jsx
import { useState, lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const Footer = lazy(() => import("./components/Footer"));
const Header = lazy(() => import("./components/Header"));
const NotFound = lazy(() => import("./pages/404"));
const HomePage = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/about/Index"));
const TeamPage = lazy(() => import("./pages/about/Team"));
const BlogPage = lazy(() => import("./pages/blog/Index"));
const BlogDetailPage = lazy(() => import("./pages/blog/Detail"));
const BlogListPage = lazy(() => import("./pages/blog/List"));
const Layout = lazy(() => import("./pages/blog/Layout"));
const ServicePage = lazy(() => import("./pages/service/Index"));
const NowPage = lazy(() => import("./pages/service/Now"));

// moak data
const BlogDatas = [
  { id: 1, title: "블로그 1", cate: "design", content: "디자인 관련 글 1" },
  { id: 2, title: "블로그 2", cate: "market", content: "마케팅 관련 글" },
  { id: 3, title: "블로그 3", cate: "design", content: "디자인 관련 글 2" },
  { id: 4, title: "블로그 4", cate: "idea", content: "아이디어 관련 글" },
  { id: 5, title: "블로그 5", cate: "design", content: "디자인 관련 글 3" },
];

function App() {
  const [isMember, setIsMember] = useState(true);
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>로딩중...</div>}>
                <HomePage title={"좋은회사"} year={2024} />
              </Suspense>
            }
          />

          <Route path="/about">
            <Route
              index
              element={
                <Suspense fallback={<div>로딩중...</div>}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="team"
              element={
                <Suspense fallback={<div>로딩중...</div>}>
                  <TeamPage />
                </Suspense>
              }
            />
          </Route>

          <Route path="/service">
            <Route
              index
              element={
                <Suspense fallback={<div>로딩중...</div>}>
                  <ServicePage />
                </Suspense>
              }
            />
            <Route
              path="now"
              element={
                <Suspense fallback={<div>로딩중...</div>}>
                  <NowPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/blog"
            element={
              <Suspense fallback={<div>로딩중...</div>}>
                <Layout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<div>로딩중...</div>}>
                  <BlogPage data={BlogDatas} />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<div>로딩중...</div>}>
                  <BlogDetailPage />
                </Suspense>
              }
            />
            <Route
              path="list"
              element={
                <Suspense fallback={<div>로딩중...</div>}>
                  <BlogListPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <Suspense fallback={<div>로딩중...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer>
        <p>Copyright 2024 By Hong</p>
        {isMember ? <p>로그인 하셨네요.</p> : <p>로그인 전입니다.</p>}
      </Footer>
    </Router>
  );
}

export default App;
```

## 3. 라이브러리 활용

- `react-spinner`
- https://www.npmjs.com/package/react-spinners
- https://www.davidhu.io/react-spinners/

```jsx
import styled from "@emotion/styled";
import { PacmanLoader } from "react-spinners";

const LodingDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <LodingDiv>
      <PacmanLoader color="#f7f54a" size={50} speedMultiplier={2} />
    </LodingDiv>
  );
};
export default Loading;
```

```jsx
import styled from "@emotion/styled";
import { PacmanLoader } from "react-spinners";

const LoadingDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <LoadingDiv>
      <PacmanLoader color="#f71b64" margin={17} size={51} speedMultiplier={2} />
    </LoadingDiv>
  );
};
export default Loading;
```

```jsx
import { lazy, Suspense, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const Footer = lazy(() => import("./components/Footer"));
const Header = lazy(() => import("./components/Header"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HomePage = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/about/Index"));
const TeamPage = lazy(() => import("./pages/about/Team"));
const BlogDetailPage = lazy(() => import("./pages/blog/Detail"));
const BlogPage = lazy(() => import("./pages/blog/Index"));
const Layout = lazy(() => import("./pages/blog/Layout"));
const BlogListPage = lazy(() => import("./pages/blog/List"));
const ServicePage = lazy(() => import("./pages/service/Index"));
const NowPage = lazy(() => import("./pages/service/Now"));

// 목(Mock Data) 데이터
const BlogDatas = [
  { id: 1, title: "블러그 1", cate: "design", content: "디자인 관련글 1" },
  { id: 2, title: "블러그 2", cate: "market", content: "마케팅 관련글" },
  { id: 3, title: "블러그 3", cate: "design", content: "디자인 관련글 2" },
  { id: 4, title: "블러그 4", cate: "idea", content: "아이디어 관련글" },
  { id: 5, title: "블러그 5", cate: "design", content: "디자인 관련글 3" },
];

function App() {
  const [isMember, setIsMember] = useState(true);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage title={"좋은회사"} year={2024} />
              </Suspense>
            }
          />

          <Route path="/about">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="team"
              element={
                <Suspense fallback={<Loading />}>
                  <TeamPage />
                </Suspense>
              }
            />
          </Route>

          <Route path="/service">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <ServicePage />
                </Suspense>
              }
            />
            <Route
              path="now"
              element={
                <Suspense fallback={<Loading />}>
                  <NowPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/blog"
            element={
              <Suspense fallback={<Loading />}>
                <Layout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <BlogPage data={BlogDatas} />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<Loading />}>
                  <BlogDetailPage />
                </Suspense>
              }
            />
            <Route
              path="list"
              element={
                <Suspense fallback={<Loading />}>
                  <BlogListPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer>
        <p>Copyright 2024 By Hong</p>
        {isMember ? <p>로그인 하셨네요.</p> : <p>로그인 전입니다.</p>}
      </Footer>
    </Router>
  );
}

export default App;
```
