import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  return <div>/blog/{id} 블로그 상세 페이지(RestAPI 방식)</div>;
}

export default Detail;
