import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">🧨home</Link>
      <Link to="/about">🎎about</Link>
      <Link to="/about/team">🎎about/team</Link>
      <Link to="/service">📏service</Link>
      <Link to="/service/now">📏service/now</Link>
      <Link to="/blog">📐blog</Link>
      <Link to="/blog/1">✂blog/:id</Link>
      <Link to="/blog/list?id=1&cate=design">🗃blog/list?쿼리스트링</Link>
    </header>
  );
};
export default Header;
