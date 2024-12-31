import TodoAdd from "./components/todo/TodoAdd";
import TodoList from "./components/todo/TodoList";
import { TodoProvider } from "./contexts/todoProvider";

// 아래 Provider 에 의해 state, dispatch 접근가능
function App() {
  return (
    <TodoProvider>
      <TodoAdd />
      <br />
      <br />
      <TodoList />
    </TodoProvider>
  );
}
export default App;
