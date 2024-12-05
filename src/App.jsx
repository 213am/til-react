import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// as 는 alias 라는 문법으로 별칭을 지을 때 사용
// BrowserRouter 의 별칭을 Router 라고 지어줘 축약해서 사용
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./pages/404";
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import BlogDetailPage from "./pages/blog/Detail";
import BlogPage from "./pages/blog/Index";
import BlogListPage from "./pages/blog/List";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import { useState } from "react";
import Layout from "./pages/blog/Layout";

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
            element={<HomePage title={"좋은회사"} year={2024} />}
          />

          <Route path="/about">
            <Route index element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          <Route path="/service">
            <Route index element={<ServicePage />} />
            <Route path="now" element={<NowPage />} />
          </Route>

          <Route path="/blog" element={<Layout />}>
            <Route index element={<BlogPage data={BlogDatas} />} />
            <Route path=":id" element={<BlogDetailPage />} />
            <Route path="list" element={<BlogListPage />} />
          </Route>
          {/* 존재하지 않는 페이지 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
      <Footer>
        <p>Copyright 2024 by Hong</p>
        {isMember ? <p>로그인 완료</p> : <p>로그인 해주세요</p>}
      </Footer>
    </Router>
  );
}

export default App;
