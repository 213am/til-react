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
