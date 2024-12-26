# useMemo

## useMemo

- 값을 연산한 결과 보관시 활용
- 배열의 복잡한 연산시 결과 보관에 활용
- 변수를 보관
- 값, 또는 복잡한 계산의 결과를 재활용할 때
- 같은 값을 계속해서 리렌더링 시 `계산하지 않도록 보관`
- `가능한 남용하지 않도록` 오히려 부하가 발생할 수 있음

## 기본 이해

- 아래 코드는 숫자를 변경하면 다시 계산한다
- 아래 코드는 글자를 변경하면 다시 number 를 계산한다
- 즉, 매번 다시 계산한다(성능상 이유없이 다시 계산하는 문제)

```jsx
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");
  const resultFn = () => {
    return number * number;
  };

  return (
    <div>
      <h1>간단한 계산 출력</h1>
      <div>
        <input
          type="number"
          placeholder="숫자를 입력하세요"
          value={number}
          onChange={e => {
            setNumber(parseInt(e.target.value));
          }}
        />
        <p>값 : {number}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="글자를 입력하세요"
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <p>글자 : {text}</p>
      </div>
    </div>
  );
}
export default App;
```

- useMemo 를 이용한 연산에 조건을 걸어두고 진행하도록 변경
- 불필요한 연산을 배제해 성능 최적화

```jsx
import { useState, useMemo } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");
  // 값을 메모해두고 해당하는 state 가 변경되면 그때만 업데이트 해라
  const resultFn = useMemo(() => {
    console.log("다시 계산합니다 : ", number);
    return number * number;
  }, [number]);
  // [ ] 는 의존성 배열이라고 함
  // number 라는 값이 바뀌면 다시 연산을 하고
  // 그 외에는 예전 값을 사용하라는 의미

  return (
    <div>
      <h1>간단한 계산 출력</h1>
      <div>
        <input
          type="number"
          placeholder="숫자를 입력하세요"
          value={number}
          // 숫자를 입력할 때 값 변경 : number 값 업데이트
          onChange={e => {
            setNumber(parseInt(e.target.value));
          }}
        />
        <p>값 : {resultFn}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="글자를 입력하세요"
          value={text}
          // 글자를 입력할 때 number 는 다시 계산하지 않도록
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <p>글자 : {text}</p>
      </div>
    </div>
  );
}
export default App;
```

### 활용 예제

- 단순 연산 외에 배열 처리시 활용
- 배열이 엄청 길때, 배열을 다루는 연산이 복잡하면 실행이 느려짐
- 배열이 변경 될때만 연산하도록 useMemo 활용

```jsx
import { useState, useMemo } from "react";

function App() {
  // 검색어
  const [query, setQuery] = useState("");
  // 검색할 배열요소들 : 실제로는 훨씬 많은 요소가 있다고 가정
  const items = ["apple", "banana", "cherry", "date", "elderberry"];

  // query나 items가 변경될 때만 필터링
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    return items.filter(item => item.includes(query));
  }, [query, items]);
  // query 와 items 에 변화가 일어나면 그때만 계산을 다시하라

  return (
    <div>
      <h1>Filtered List</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search items"
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

- 배열요소 검색 예제

```jsx
import { useMemo, useState } from "react";

function App() {
  // 데이터를 정렬한다
  const [sortBy, setSortBy] = useState("name");
  // 더미 데이터
  const data = [
    { id: 1, name: "Bbc", age: 40 },
    { id: 2, name: "Abc", age: 25 },
    { id: 3, name: "Cbc", age: 35 },
  ];

  // 복잡한 연산을 매번 실행하지 않고, sortBy 가 바뀐 경우에만 정렬하도록
  const sortData = useMemo(() => {
    console.log(sortBy, "로 정렬함");
    // 아래 sort 구문은 조건에 따라서 true, false 를 반복해 순서배치
    return [...data].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }, [sortBy]);

  console.log(sortData);

  return (
    <div>
      <h1>배열의 속성을 이용한 정렬</h1>
      <div>
        <select
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value);
          }}
        >
          <option value={"id"}>ID</option>
          <option value={"name"}>Name</option>
          <option value={"age"}>Age</option>
        </select>
      </div>
      {/* 표 */}
      <table border={1}>
        {/* table 의 header */}
        <thead>
          {/* table의 row */}
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        {/* table 의 body */}
        <tbody>
          {sortData.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
```
