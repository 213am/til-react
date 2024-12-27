// 일반적으로 FE 개발자는 백엔드와 API 통신을 할 것이다
// 일반적으로 FE 개발자는 주소와 자료를 전달하고 결과를 받을 것이다
// 일반적으로 FE 개발자는 GET, POST, PUT, DELETE 를 사용할 것이다
// 내가 API 통신을 편리하게 사용할 수 있는 hook 을 만들어서
// 팀의 API 통신 컨벤션을 제공하겠다.

import { useEffect, useState } from "react";
import axios from "axios";

// 일반적 사용을 조사
// const { data, error, location } = useAxios("주소", "자료", "get");
// const { data, error, location } = useAxios("주소", { 자료 }, "post");
// const { data, error, location } = useAxios("주소", null, "put");
// const { data, error, location } = useAxios("주소", 1, "delete");
export function useAxios(_url, _payload = null, _method) {
  // api 회신결과
  const [data, setData] = useState(null);
  // api 회신 오류
  const [error, setError] = useState(null);
  // api 호출 진행 중
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // loading 진행 중
    setLoading(true);
    // API 연동 실행
    const fetchAPI = async () => {
      try {
        let res;
        let method = _method.toUppercase(_method);
        switch (method) {
          case "GET":
            res = await axios.get(_url);
            break;

          case "POST":
            res = await axios.post(_url, _payload);
            break;

          case "PUT":
            res = await axios.put(_url, _payload);
            break;

          case "DELETE":
            res = await axios.delete(_url);
            break;

          default:
            throw new Error(`${_method} 잘못 보내셨네요`);
        }
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    // 만들어둔 fetch 실행
    fetchAPI();
    // 로딩 완료
    setLoading(false);
  }, [_url, _payload, _method]);

  return { data, error, loading };
}
