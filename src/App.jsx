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
