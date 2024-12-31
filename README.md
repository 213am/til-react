# useReducer & Context API

- useReducer 는 state 업데이트 시 복잡한 과정을 처리하기 위해 활용
- 의도는 useReducer 를 이용해서 Context State 관리해보자
- Context API 는 App 서비스 전체에 공용으로 사용하는 state 이다
- RTK 를 이해하기 위한 기초이다.

## count 기능 테스트 폴더 생성

- `/src/contexts` 폴더
  : `counterContext.js`

  ```js
  import { createContext } from "react";

  // Context 생성
  export const CounterStateContext = createContext(null);
  // Dispatch 용 Context 생성
  export const CounterDispatchContext = createContext(null);
  ```

  : `counterProvider.jsx`

  ```jsx
  import { useReducer } from "react";
  import {
    CounterDispatchContext,
    CounterStateContext,
  } from "./counterContext";

  // 1. 기본값
  const initialState = { count: 0 };
  // 2. 리듀서 함수
  function reducer(state, action) {
    switch (action.type) {
      case "add":
        return { count: state.count + 1 };
      case "minus":
        return { count: state.count - 1 };
      case "reset":
        return { count: 0 };
      default:
        return state;
    }
  }

  // Context Provider 생성
  export function CounterProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <CounterStateContext.Provider value={state}>
        <CounterDispatchContext.Provider value={dispatch}>
          {children}
        </CounterDispatchContext.Provider>
      </CounterStateContext.Provider>
    );
  }
  ```

- `/src/components` 폴더
  : `Counter.jsx`

```jsx
import { useContext } from "react";
import {
  CounterDispatchContext,
  CounterStateContext,
} from "../../contexts/counterContext";

function Counter() {
  // 앱 전체 context state
  const state = useContext(CounterStateContext);
  // 앱 전체 context dispatch
  const dispatch = useContext(CounterDispatchContext);

  return (
    <div>
      <h1>Count : {state.count}</h1>
      <br />
      <button onClick={() => dispatch({ type: "add" })}>증가</button>
      <button onClick={() => dispatch({ type: "minus" })}>감소</button>
      <button onClick={() => dispatch({ type: "reset" })}>초기화</button>
    </div>
  );
}
export default Counter;
```

## Todo 기능 테스트 폴더 생성

- `/src/contexts/` 폴더에 컨텍스트 생성
  : `todoContext.js` - 데이터 용

  ```js
  import { createContext } from "react";

  // 데이터용 state context
  export const TodoStateContext = createContext(null);
  // 데이터 업데이트용 dispatch context
  export const TodoDispatchContext = createContext(null);
  ```

  : `todoProvider.jsx` - context 에 데이터와 dispatch 등록

  ```jsx
  import { useReducer } from "react";
  import { TodoDispatchContext, TodoStateContext } from "./todoContext";

  // 1. 상태관리
  const initialTodoState = [];
  // 2. 리듀서 함수
  function todoReducer(state, action) {
    switch (action.type) {
      case "add":
        return [
          ...state,
          { id: Date.now(), text: action.payload, completed: false },
        ];
      case "toggle":
        return state.map(item =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item,
        );
      case "delete":
        return state.filter(item => item.id !== action.payload);
      default:
        return state;
    }
  }
  // 3. context Provider 셋팅
  export function TodoProvider({ children }) {
    const [todos, dispatch] = useReducer(todoReducer, initialTodoState);

    return (
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={dispatch}>
          {children}
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    );
  }
  ```

### context 활용 컴포넌트들

- `src/components/todo` 폴더 생성

  : `TodoAdd.jsx`

  ```jsx
  import { useContext, useState } from "react";
  import { TodoDispatchContext } from "../../contexts/todoContext";

  // dispatch 를 이용해서 state 를 업데이트
  const TodoAdd = () => {
    const dispatch = useContext(TodoDispatchContext);
    const [text, setText] = useState("");

    return (
      <>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={() => dispatch({ type: "add", payload: text })}>
          추가
        </button>
      </>
    );
  };
  export default TodoAdd;
  ```

  : `TodoList.jsx`

  ```jsx
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
  ```

  : `TodoItem.jsx`

  ```jsx
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
  ```

# 고민해보세요

- 1. Context API 를 사용할지 말지
     : 사용자 로그인정보
     : 디자인 스킨 정보 ( theme )
     : 장바구니 정보

- 2. Context API 사용을 결정했다면
     : useReducer 도입하는 걸 고민해보자
