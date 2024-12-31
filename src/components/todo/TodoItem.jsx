import { useContext } from "react";
import { TodoDispatchContext } from "../../contexts/todoContext";

// dispatch 로 delete, toggle
const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoDispatchContext);

  return (
    <>
      <span
        style={{
          cursor: "pointer",
          textDecoration: todo.completed ? "line-through" : "none",
        }}
        onClick={() => dispatch({ type: "toggle", payload: todo.id })}
      >
        {todo.id} : {todo.text}
      </span>
      <button onClick={() => dispatch({ type: "delete", payload: todo.id })}>
        삭제
      </button>
    </>
  );
};
export default TodoItem;
