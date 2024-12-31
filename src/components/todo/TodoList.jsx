import { useContext } from "react";
import { TodoStateContext } from "../../contexts/todoContext";
import TodoItem from "./TodoItem";

// context state 에 변경된 내용 출력
const TodoList = () => {
  const todos = useContext(TodoStateContext);

  return (
    <>
      {todos.map(item => (
        <div key={item.id}>
          <TodoItem todo={item} />
        </div>
      ))}
    </>
  );
};
export default TodoList;
