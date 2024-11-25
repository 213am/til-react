import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./indexpage.module.css";

function IndexPage() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.layout}>
          <div>공지사항 / 갤러리</div>
          <div>배너</div>
          <div>바로가기</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default IndexPage;
