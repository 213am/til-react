# 커스텀 훅(custom hook)

## hook 이란?

- hook 은 우리나라말로 `걸다` 또는 `덩달아서 실행된다`는 의미
- hook 은 영어로는 `갈고리` 를 의미함
- react 컴포넌트의 state 와 lifecycle 에 따라서 같이 실행되어지는 함수
- useState, useEffect, useContext, useRef, useMemo, useCallback 등등 200여개
- 개발자가 react built-in hook 처럼 만든 hook 을 커스텀 훅이라고 함
  : 예시) useLocation, useNavigation 등
- 나도 필요하다면 hook 을 직접 만들어서 사용할 수 있다

## hook 을 만들 때 유의사항

- 동일한 기능을 만약 여러번 사용한다면 함수를 만들어 볼 생각을 하자
- 이 함수가 컴포넌트에 사용이 된다면? hook 으로 만들어 볼 생각을 하자
- `/src/hooks` 라는 폴더에 모아서 사용해보자
- 파일명은 반드시 `use이름` 으로 생성해야 react 에서 hook 처럼 사용할 수 있다.

## hook 을 사용할 때 유의사항

- react hook이든, custom hook이든 반드시 `컴포넌트 내부에 배치`되어야 한다
- react hook이든, custom hook이든 `if 문, for 문 등의 내부에서는 사용할 수 없다`
- 예외로 컴포넌트가 아닌 곳에도 react hook 을 사용할 수 있는 곳은 custom hook 이다

## 기본 예제

```jsx
import { useCount } from "./hooks/useCount";

function App() {
  const { count, add, minus, reset } = useCount();

  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => add()}>증가</button>
      <button onClick={() => minus()}>감소</button>
      <button onClick={() => reset()}>초기화</button>
    </div>
  );
}
export default App;
```

- `src/hooks/useCount.js`

```jsx
import { useState } from "react";

export function useCount(initvalue = 0) {
  const [count, setCount] = useState(initvalue);
  const add = () => setCount(count + 1);
  const minus = () => setCount(count - 1);
  const reset = () => setCount(initvalue);

  return { count, add, minus, reset };
}
```

## 실제 custom hook 생성 과정

- 동일한 기능의 반복 사용이라면? custom hook 고민해보자
- custom hook 을 생성시 많은 고민을 해야 합니다

- `src/hooks/useAxios.js` 샘플

```jsx
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
```

- `/src/hooks/useLogin.js` 샘플

```jsx
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
```

- `/src/hooks/useComponent.js` 샘플

```jsx
import { useEffect, useState } from "react";

// 화면의 리사이즈를 체크하는 용도의 customHook
const useComponent = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
export default useComponent;
```

## custom hook 사용

- App.jsx

```jsx
import { useAxios } from "./hooks/useAxios";
import useComponent from "./hooks/useComponent";
import { useCount } from "./hooks/useCount";
import { useLogin } from "./hooks/useLogin";

function App() {
  const { count, add, minus, reset } = useCount();
  const { data, error, loading } = useAxios();
  const { data, isLoading, error, isLogin, login } = useLogin();
  const windowSize = useComponent();

  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => add()}>증가</button>
      <button onClick={() => minus()}>감소</button>
      <button onClick={() => reset()}>초기화</button>
    </div>
  );
}
export default App;
```
