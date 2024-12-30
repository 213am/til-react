import { useReducer } from "react";
import { countReducer } from "../../modules/counter/countReducer";
import { countInitialState } from "../../modules/counter/countInitialState";
import { add, minus, reset } from "../../modules/counter/countActions";

function Counter() {
  const [countState, dispatch] = useReducer(countReducer, countInitialState);

  return (
    <div>
      <h1>Count : {countState.count}</h1>
      <br />
      <button onClick={() => dispatch(add())}>증가</button>
      <button onClick={() => dispatch(minus())}>감소</button>
      <button onClick={() => dispatch(reset())}>초기화</button>
    </div>
  );
}
export default Counter;
