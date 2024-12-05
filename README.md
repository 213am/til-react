# react-router-dom

- 리액트에는 http 경로를 이용한 화면이동이 없습니다.
- 통상 http 경로를 `라우터`라고 합니다.
- `라우터`를 사용하려면 `react-router-dom` 을 사용해야 합니다.

## 1. 참고사항

- link

```html
<a href="router"> 이동 </a>
```

- form 의 action

```html
<form action="router">...</form>
```

<br />

## 2. URI 의 구성

- `http://localhost:3000/todo/login?id=hong&pass=123`

### 2.1. Protocol(네트워킹을 위한 약속)

```
HTTP (HyperText Transfer Protocol)
 : 웹 브라우저와 서버 간의 데이터 전송.

HTTPS (HTTP Secure)
 : HTTP에 보안(SSL/TLS)을 추가한 프로토콜.

FTP (File Transfer Protocol)
 : 파일 전송에 사용.

SMTP (Simple Mail Transfer Protocol)
 : 이메일 전송.

IMAP (Internet Message Access Protocol)
 : 이메일 수신(서버에서 관리).

POP3 (Post Office Protocol 3)
 : 이메일 수신(다운로드 후 로컬 관리).

DNS (Domain Name System)
 : 도메인 이름을 IP 주소로 변환.

DHCP (Dynamic Host Configuration Protocol)
 : 동적 IP 주소 할당.
```

### 2.2. 도메인(Domain)

- 일반적으로의 대화에서는 `홈페이지 주소`로 이해
- 코딩에서 `도메인`을 지키라는 의미는 `업무를 식별`해서 개발하는 것을 의미한다.
- `DNS`는 **D**omain **N**ame **S**ystem 로 IP 에 글자로 된 이름을 부여하는데 사용

### 2.3. Port 번호

- `:3000`
- `:80` port 는 기본 포트입니다(도메인으로 접속시 자동연결)
  > :80 은 안 적으면 자동 적용

### 2.4. Path

- `경로/todo/login`
- `경로/member/login`

### 2.5. Query String

- `?~~~`
- 질의문(질문하고 결과를 받겠다)

<br />

## 3. URI 를 이용해서 React 에서 활용

- `react-router-dom`
- https://www.npmjs.com/package/react-router-dom
- https://reactrouter.com/start/framework/route-module
- 설치 `npm i react-router-dom`

<br/>

## 4. 활용 전에 고민해야할 사항

- sitemap

```js
http://localhost:3000/                첫페이지

http://localhost:3000/about           소개
http://localhost:3000/about/mission   미션
http://localhost:3000/about/team      팀

http://localhost:3000/service         서비스

http://localhost:3000/blog            블로그
http://localhost:3000/blog/design     디자인
http://localhost:3000/blog/design/1           // REST_API
http://localhost:3000/blog/design/detail?id=1 // query-string

http://localhost:3000/blog/market     마케팅
http://localhost:3000/blog/news       뉴스
http://localhost:3000/portfolio       포트폴리오
http://localhost:3000/contact         문의
```

<br/>

## 5. Route 에 맞게 pages 폴더 구성

- `~~/` Root 페이지 또는 Root 라우터
  : `src/pages/Index.jsx`

- `~~/about`
  : `src/pages/about/Index.jsx`

- `~~/about/team`
  : `src/pages/about/Team.jsx`

- `~~/service`
  : `src/pages/service/Index.jsx`

- `~~/service/now`
  : `src/pages/service/Now.jsx`

- `~~/blog`
  : `src/pages/blog/Index.jsx`

- `~~/blog/1`
  : `src/pages/blog/Detail.jsx`

- `~~/blog/list?id=1&cate=design`
  : `src/pages/blog/List.jsx`

<br />

## 6. Route 적용은 App.js 에 하기로 해요

- 아래를 지켜주셔야 합니다.
- `(Browser)Router > Routes > Route`
- `as` 를 확인하세요

### 6.1. 기본으로 작업한다면

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// as 는 alias 라는 문법으로 별칭을 지을 때 사용
// BrowserRouter 의 별칭을 Router 라고 지어줘 축약해서 사용
function App() {
  return (
    <Router>
      <Routes>
        <Route />
        <Route />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
```

### 6.2. 중첩(Nested) 라우터

- `일반적`으로 활용해요.
- `<Route index component={컴포넌트} />` 주의해요.

### 6.3. 존재하지 않는 path 로 접근 시 처리법

- `path="*"` 제일 하단에 배치 권장
- `<Route path="\*" element={<NotFound />}></Route>`

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// as 는 alias 라는 문법으로 별칭을 지을 때 사용
// BrowserRouter 의 별칭을 Router 라고 지어줘 축약해서 사용
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import BlogDetailPage from "./pages/blog/Detail";
import BlogListPage from "./pages/blog/List";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about">
          <Route index element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        <Route path="/service">
          <Route index element={<ServicePage />} />
          <Route path="now" element={<NowPage />} />
        </Route>

        <Route path="/blog">
          <Route index element={<BlogPage />} />
          <Route path="1" element={<BlogDetailPage />} />
          <Route path="list?id=1&cate=design" element={<BlogListPage />} />
        </Route>
        {/* 존재하지 않는 페이지 */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

## 7. 라우터에 `Params` 전달하기

- `Param` 이라는 단어를 꼭❗❗❗ 기억하기
- 백엔드 서버와의 연동에 필수적인 내용
- `path/param`
  > 예시 `http://localhost:5173/good/10` : 10 이 param
  > 예시 `http://localhost:5173/blog/21` : 21 이 param

```jsx
<Route path=":id" element={<BlogDetailPage />} />
```

```jsx
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      /blog/<b>{id}</b> 블로그 상세 페이지(REST_API 방식)
    </div>
  );
}

export default Detail;
```

## 8. query string 활용

- `?` : `Search` 라고 생각해보기

```jsx
import { useSearchParams } from "react-router-dom";

function List() {
  // useSearchParams 를 통해 가져온 데이터 담기
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  // 개별 데이터 뜯기
  const id = searchParams.get("id");
  const cate = searchParams.get("cate");
  console.log(id);
  console.log(cate);

  return (
    <div>
      /blog/list?id={id}&cate={cate} 블로그 목록(query-string 방식)
    </div>
  );
}

export default List;
```

## 9. 공통 레이아웃 적용하기

```jsx
<header></header>
<main> URI에 따라서 변화할 부분</main>
<footer></footer>
```

### 9.1. 기본 Link 이해하기

```jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// as 는 alias 라는 문법으로 별칭을 지을 때 사용
// BrowserRouter 의 별칭을 Router 라고 지어줘 축약해서 사용
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import BlogDetailPage from "./pages/blog/Detail";
import BlogListPage from "./pages/blog/List";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <header>
        <Link to="/">🏚 HOME </Link>
        <Link to="/about">👀 about </Link>
        <Link to="/about/team">🙌 about/team </Link>
        <Link to="/service">🎈 service </Link>
        <Link to="/service/now">📲 service/now </Link>
        <Link to="/blog">📝 blog </Link>
        <Link to="/blog/1">🧭 blog/:id </Link>
        <Link to="/blog/list?id=1&cate=design">🗺 blog/list?qeuryString</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about">
            <Route index element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          <Route path="/service">
            <Route index element={<ServicePage />} />
            <Route path="now" element={<NowPage />} />
          </Route>

          <Route path="/blog">
            <Route index element={<BlogPage />} />
            <Route path=":id" element={<BlogDetailPage />} />
            <Route path="list" element={<BlogListPage />} />
          </Route>
          {/* 존재하지 않는 페이지 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
      <footer>하단</footer>
    </Router>
  );
}

export default App;
```

### 9.2. component 로 Header.jsx 만들기

```jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">🏁HOME </Link>
      <Link to="/about">👀about </Link>
      <Link to="/about/team">🙌about/team </Link>
      <Link to="/service">🎈service </Link>
      <Link to="/service/now">📲service/now </Link>
      <Link to="/blog">📝blog </Link>
      <Link to="/blog/1">🧭blog/:id </Link>
      <Link to="/blog/list?id=1&cate=design">🌏blog/list?qeuryString</Link>
    </header>
  );
};
export default Header;
```

### 9.3. component 로 Footer.jsx 만들기

<br/>

## 10. page 에 `props` 전달하기

```jsx
<Route path="/" element={<HomePage title={"좋은회사"} year={2024} />} />
```

```jsx
// moak data
const BlogDatas = [
  { id: 1, title: "블로그 1", cate: "design", content: "디자인 관련 글 1" },
  { id: 2, title: "블로그 2", cate: "market", content: "마케팅 관련 글" },
  { id: 3, title: "블로그 3", cate: "design", content: "디자인 관련 글 2" },
  { id: 4, title: "블로그 4", cate: "idea", content: "아이디어 관련 글" },
  { id: 5, title: "블로그 5", cate: "design", content: "디자인 관련 글 3" },
];

<Route path="/blog">
  <Route index element={<BlogPage data={BlogDatas} />} />
  <Route path=":id" element={<BlogDetailPage />} />
  <Route path="list" element={<BlogListPage />} />
</Route>;
```

<br/>

## 11. page 에 props 중 `children` 전달하기

```jsx
const [isMember, setIsMember] = useState(true);

<Footer>
  <p>Copyright 2024 by Hong</p>
  {isMember ? <p>로그인 완료</p> : <p>로그인 해주세요</p>}
</Footer>;
```

```jsx
const Footer = ({ children }) => {
  return <footer>{children}</footer>;
};
export default Footer;
```

<br />

## 12. react-router-dom 의 `Outlet` 이해하기

- `Router` 를 이용해 페이지의 `레이아웃`을 유지하고
- `Router 의 Outlet 장소`에 `path` 에 따라서 `component` 출력
- 반드시 **`중첩 Route`** 여야 가능

> // sample 시나리오
>
> 1. Layout 용 페이지를 만든다.
> 2. 처음엔 index 컴포넌트가 보인다.
> 3. 그래서 사용자가 블로그의 목록을 보고있다.
> 4. 목록 중 **상세보기**를 클릭하면
> 5. 레이아웃에 상세내용 페이지가 출력된다.

- `/src/pages/blog/Layout.jsx`

```jsx
<Route path="/blog" element={<Layout />}>
  <Route index element={<BlogPage data={BlogDatas} />} />
  <Route path=":id" element={<BlogDetailPage />} />
  <Route path="list" element={<BlogListPage />} />
</Route>
```

```jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div>로컬메뉴</div>
      <div>
        <h2>Outlet 자리</h2>
        <div
          style={{
            backgroundColor: "yellowgreen",
            width: "100%",
            minHeight: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 50,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
```

## 13. `Outlet` 과 `children` 의 비교

- 공통점
  : JSX 를 전달한다.

- 차이점
  : `children` 은 `props` 로 전달 ( 태그의 내용처럼)
  : `Outlet` 은 `중첩 Route` 에 전달

```jsx
<Footer>
  <p>Copyright 2024 by Hong</p>
  {isMember ? <p>로그인 완료</p> : <p>로그인 해주세요</p>}
</Footer>
```

```jsx
<Route path="/blog" element={<Layout />}>
  <Route />
  <Route />
</Route>
```

<br/>

## 14. path 및 Params 를 실시간 생성하기

### 14.1. 문자열("") 또는 백틱(``)으로 생성

```js
const path = "/service";
const path = `/service`;
const path = `/service/${id}`;
// SearchParams 예시
const path = `/service?age=${변수}&pass=${변수}`;
```

### 14.2. SearchParams 만들기

```js
const queryStr = createSearchParams({ key: value, key: value }).toString();
const path = queryStr;
```

### 14.3. `<Link to="">` 말고 `js 로 강제 이동`하기

```js
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const path = `/service?age=${변수}&pass=${변수}`;
navigate(path);
```

```js

```

### 14.4. 현재 `path` 를 알고 싶을 때

```js
import { useLocation } from "react-router-dom";

const {pathname, search, state} = useLocation();

console.log(location)

// 담겨진 결과
// http://localhost:5173/blog?hi=5
{
    "pathname": "/blog",
    "search": "?hi=5",
    "hash": "",
    "state": null,
    "key": "default"
}
```

### 14.5. 사용자 모르게 라우터에 `state` 전달하기

- `Link` 로는 어렵다.
- `useNavigate()` 이용

- `Link` 로는 어렵다.
- `useNavigate()` 이용

```js
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const path = `/service`;
navigate(path);
```

```js
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const path = `/service`;

const secretData = {
  memo: "제품페이지에서 왔어요.",
  good: "제품 1번을 보고 있었지요.",
  favorite: "제품 1에 관심이 많네요.",
};

navigate(
  {
    pathname: path,
    search: "?hi=5",
  },
  { state: { secretData } },
);
```
