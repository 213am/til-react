# useCallback

- useCallback() : 함수를 리렌더링 시 다시 정의하지 않고 보관해둠

## 기본예제

```jsx
import { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  // 리렌더링 즉, state 가 변경되면 함수도 다시 정의됨
  // 이를 다시 정의하지 않도록 useCallback 활용하기
  const add = useCallback(() => {
    // 함수의 기능
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <h1> 카운트 : {count}</h1>
      <button onClick={add}>증가</button>
    </div>
  );
}
export default App;
```

## 응용예제

- `컴포넌트는 props 가 전달되면 리렌더링 된다`
- `props 에 변화가 없으면 리렌더링이 되지 않는다`

```jsx
import { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  // 숫자 증가 함수를 저장해둠
  // 만약 count 가 변하면 리렌더링이 됨
  // 만약 text 가 변하면 리렌더링이 됨
  // useCallback 을 활용하지 않는다면? text, count 중 어느 하나라도 변하면 함수가 다시 정의됨
  const add = useCallback(() => {
    console.log("함수가 재정의 됐어요");
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <h1>부모 컴포넌트</h1>
      <Child add={add} />
      <div>카운트 : {count}</div>
      <input
        type="text"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}
export default App;

function Child({ add }) {
  console.log("자식 컴포넌트 리렌더링");
  return (
    <div>
      <h2>자식 컴포넌트</h2>
      <button onClick={add}>증가</button>
    </div>
  );
}
```

- 의존성 배열의 이해

```jsx
import { useState, useCallback } from "react";

function App() {
  const [query, setQuery] = useState("");

  // query가 변경될 때만 함수가 재생성되도록 설정
  const searchHandler = useCallback(() => {
    console.log("query를 처리하는 새로운 함수 생성", query);
  }, [query]);

  return (
    <div>
      <h1>state 변경시 함수 재 실행</h1>
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      />
      <button onClick={searchHandler}>검색</button>
    </div>
  );
}

export default App;
```
