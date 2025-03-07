# 최적화

- 개발시에는 최적화 하지 않음
- 이유는 최적화로 인해서 개발의 속도가 오히려 늦어질 수 있음
- 개발 이후 시간을 가지고 최적화를 고민

## 종류

- useMemo : 변수 저장해두고 변화가 있을때만 다시 계산하기
- useCallback : 함수 저장해두고 새로 렌더링 될때 다시 만들지 않기
- React.memo : 컴포넌트에서 props 가 바뀌지 않으면 새로 렌더링하지 않기

## useMemo

- 문제점

  - count state 가 변경시에
  - 값이 변하지 않는 now 값도 매번 다시 계산됨

- 원하는 것

  - num state 가 변할때만
  - 값을 새로 계산해야하는 now 가 계산되도록

```jsx
import { useMemo } from "react";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  console.log("count : ", count);

  const [num, setNum] = useState(1);
  const now = useMemo(() => {
    console.log("now 계산함");
    return num * 2;
  }, [num]);

  return (
    <div
      style={{ padding: 20, gap: 10, display: "flex", flexDirection: "column" }}
    >
      <h2>count 값 : {count}</h2>
      <h2>num 값 : {num}</h2>
      <h2>now 는 2배의 값 : {now}</h2>
      <div style={{ display: "flex", gap: 50, paddingTop: 20 }}>
        <button
          style={{
            padding: 5,
            backgroundColor: "darkGray",
            border: 0,
            color: "white",
            fontWeight: 700,
          }}
          onClick={() => setCount(count + 1)}
        >
          count 증가
        </button>
        <button
          style={{
            padding: 5,
            backgroundColor: "darkGray",
            border: 0,
            color: "white",
            fontWeight: 700,
          }}
          onClick={() => setNum(num + 1)}
        >
          num 증가
        </button>
      </div>
    </div>
  );
};
export default App;
```

## useCallback

- 문제점
  - count state 가 변하면
  - App 이 리렌더링 되면서
  - add 함수가 매번 다시 만들어짐

```jsx
import { useCallback, useState } from "react";
import Child from "./pages/Child";

const App = () => {
  console.log("App : 리렌더링 완료");

  const [count, setCount] = useState(0);
  // 검증을 위한 state : state 가 변하면 리렌더링함
  const [go, setGo] = useState(false);
  // 함수 정의를 저장해두자
  // count 가 변하면 함수가 다시 정의되어서 재실행한다
  const add = useCallback(() => {
    setCount(prev => prev + 1);
    console.log("add 함수 실행");
  }, []);

  return (
    <div
      style={{ padding: 20, gap: 10, display: "flex", flexDirection: "column" }}
    >
      <h2>Count : {count}</h2>
      <div style={{ marginBottom: 50 }}>
        <button
          style={{
            display: "flex",
            padding: 5,
            border: 0,
            borderRadius: 4,
            backgroundColor: "blueviolet",
            color: "white",
            fontWeight: 700,
          }}
          onClick={add}
        >
          부모가 함수실행
        </button>
        <Child add={add} />
        <button
          style={{
            display: "flex",
            padding: 5,
            border: 0,
            borderRadius: 4,
            backgroundColor: "blueviolet",
            color: "white",
            fontWeight: 700,
            marginTop: 10,
          }}
          onClick={() => setGo(!go)}
        >
          go state 갱신
        </button>
      </div>
    </div>
  );
};

export default App;
```

- `/src/pages/Child.jsx` 파일 생성

```jsx
import { memo } from "react";

const Child = ({ add }) => {
  console.log("Child : 리렌더링 완료");

  return (
    <div>
      <h3>==== Child ====</h3>
      <div style={{ display: "flex", gap: 20 }}>
        <button
          style={{
            display: "flex",
            padding: 5,
            border: 0,
            borderRadius: 4,
            backgroundColor: "blueviolet",
            color: "white",
            fontWeight: 700,
            marginTop: 10,
          }}
          onClick={add}
        >
          자식이 함수실행
        </button>
      </div>
    </div>
  );
};
export default memo(Child);
```

## React.memo

- 불필요한 리렌더링을 막아준다
- 컴포넌트가 변하면 자식 컴포넌트도 같이 변한다
- 자식에게 props 로 state 나 state 를 업데이트하는 함수를 전달하면 갱신
- 그외에는 새로 자식들이 리렌더링 되지 않는다

### props 로 state 나 함수를 전달 받으면 해당 값들이 바뀔때만 리렌더링하기

```jsx
import { useState } from "react";
import Child from "./pages/Child";

const App = () => {
  console.log("App : 리렌더링");
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20, padding: 30 }}
    >
      <div>
        <h1>count : {count}</h1>
        <button onClick={() => setCount(count + 1)}>count 증가</button>
      </div>
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <Child count={count} />
    </div>
  );
};
export default App;
```

```jsx
import { memo } from "react";

const Child = ({ count }) => {
  console.log("Child : 리렌더링", count);

  return <div>Child</div>;
};
export default memo(Child);
```
