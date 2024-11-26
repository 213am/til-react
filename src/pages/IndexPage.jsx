import Header from "../components/header/Header";
import Notice from "../components/notice/Notice";
import Banner from "../components/banner/Banner";
import { LinkDiv } from "../styles/components/common/styled-common";
import Footer from "../components/footer/Footer";
import "../styles/pages/index-page.css";

function IndexPage() {
  return (
    <>
      <Header></Header>
      <main className="main">
        <div className="slide">슬라이드</div>
        <div className="content">
          <Notice></Notice>
          <Banner></Banner>
          <LinkDiv bc={"red"} className="link">
            바로가기
          </LinkDiv>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default IndexPage;
