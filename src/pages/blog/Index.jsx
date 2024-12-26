import { Link, Outlet } from "react-router-dom";

function Index({ data }) {
  return (
    <div>
      <h1>/blog 블로그 첫페이지</h1>
      {/* 목록 */}
      <ul>
        {data.map(item => {
          return (
            <li key={item.id}>
              <div>
                {item.title}{" "}
                <button>
                  <Link to={`/blog/${item.id}`}>상세 이동</Link>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
