import { createRoot } from "react-dom/client";
import "./index.css";
import Todo from "./todos/Todo.jsx";
// import Todo1 from "./todos/Todo1.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Todo />
    {/* <Todo1 /> */}
  </>,
);
