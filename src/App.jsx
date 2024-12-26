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
