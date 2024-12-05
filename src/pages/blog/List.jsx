import { useSearchParams } from "react-router-dom";

function List() {
  // useSearchParams 를 통해 가져온 데이터 담기
  const [searchParams, setSearchParams] = useSearchParams();

  // 개별 데이터 뜯기
  const id = searchParams.get("id");
  const cate = searchParams.get("cate");

  return (
    <div>
      /blog/list?id={id}&cate={cate} 블로그 목록(query-string 방식)
    </div>
  );
}

export default List;
