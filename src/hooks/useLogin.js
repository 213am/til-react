// 로그인 관련 기능을 재사용 하지는 않더라도 한 곳에 모아서 사용
// 더불어서, 컴포넌트는 아니지만, use 훅들을 사용했다
// 일반 함수에는 use 훅들을 사용 못한다
// 그래? 그러면 custom hook 만들어서 활용한다
import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
  //
  const [isLogin, setIsLogin] = useState(false);
  //
  const [data, setData] = useState(null);
  // 서버 에러
  const [error, setError] = useState(null);
  // 서버 연결 중
  const [isLoading, setIsLoading] = useState(false);
  // 로그인 함수
  const login = async (id, pw) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/login", { id: id, pw: pw });
      setData(res.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };
  return { data, isLoading, error, isLogin, login };
};
