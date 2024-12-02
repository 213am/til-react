import { useState } from "react";
import { useEffect } from "react";

const Todo = () => {
  const initData = {
    title: "",
    content: "",
  };
  const initDataPut = {
    id: "",
    title: "",
    content: "",
  };
  // 화면 갱신용 state
  const [todoList, setTodoList] = useState([]);
  const [formData, setFormData] = useState(initData);
  // PUT 내용 수정용
  const [putData, setPutData] = useState(initDataPut);

  // 전체목록
  const getTodos = async () => {
    console.log("서버접속 후 전체 할일 가져옮");
    try {
      const result = await fetch(`http://192.168.0.66:5000/todos`);
      const data = await result.json();
      // 새로 리렌더링
      setTodoList(data);
    } catch (error) {
      console.log(`에러입니다 : ${error}`);
      console.log(`잠시 후 다시 시도해주세요`);
    }
  };
  // 상세 내용보기
  const getTodoDetail = async _id => {
    try {
      const result = await fetch(`http://192.168.0.66:5000/todos/${_id}`);
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.log(`네트워크 오류입니다. : ${error}`);
      console.log(`잠시 후 다시 시도해주세요.`);
    }
  };
  // 할일 1개 등록하기
  const postTodo = async () => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      alert("할일이 등록되었습니다.");
      getTodos();
      setFormData(initData);
    } catch (error) {
      console.log(`네트워크가 불안정 합니다. : ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };
  // 할일 1개 삭제하기
  const deleteTodo = async _id => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/todos/${_id}`, {
        method: "DELETE",
      });
      alert("데이터가 성공적으로 삭제되었습니다.");
      getTodos();
    } catch (error) {
      console.log(`네트워크 오류입니다. : ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };
  // 할일 1개의 내용 수정
  const putTodo = async () => {
    try {
      const { id, title, content } = putData;
      await fetch(`http://192.168.0.66:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      alert("수정되었습니다.");
      getTodos();
    } catch (error) {
      console.log(`서버가 불안정합니다. : ${error}`);
      console.log(`잠시 후 다시 시도해 주세요.`);
    }
  };
  // 이벤트 핸들러
  const changeHandler = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = e => {
    // 웹브라우저 새로갱신 안되도록
    e.preventDefault();
    if (formData.title === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (formData.content === "") {
      alert("내용을 입력하세요.");
      return;
    }
    postTodo();
  };
  const putChangeHandler = e => {
    const { name, value } = e.target;
    setPutData({ ...putData, [name]: value });
  };
  const putSubmitHandler = e => {
    // 웹브라우저 새로갱신 안되도록
    e.preventDefault();
    if (putData.title === "") {
      alert("수정할 제목을 입력하세요.");
      return;
    }
    if (putData.content === "") {
      alert("수정할 내용을 입력하세요.");
      return;
    }
    putTodo();
  };
  // 컴포넌트 보이면 최초 딱 한번 실행
  useEffect(() => {
    // 처음에 todo 로 이동하면, 할일 목록 전체 가져오기
    getTodos();
    return () => {};
  }, []);

  return (
    <div>
      <h1>Todo 동록</h1>
      <div>
        <form
          onSubmit={e => {
            submitHandler(e);
          }}
        >
          <div>
            <label>제목</label>
            <input
              name="title"
              value={formData.title}
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label>내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={e => {
                changeHandler(e);
              }}
            ></textarea>
          </div>
          <div>
            <button type="submit">등록</button>
          </div>
        </form>
      </div>
      <h2>상세보기</h2>
      <div>
        <form
          onSubmit={e => {
            putSubmitHandler(e);
          }}
        >
          <div>
            <label>해당 게시글 제목</label>
            <input
              name="title"
              value={putData.title}
              onChange={e => {
                putChangeHandler(e);
              }}
            />
          </div>
          <div>
            <label>해당 게시글 내용</label>
            <textarea
              name="content"
              value={putData.content}
              onChange={e => {
                putChangeHandler(e);
              }}
            ></textarea>
          </div>
          <div>
            <button type="submit">수정</button>
          </div>
        </form>
      </div>
      <h2>TodoList</h2>
      <div>
        {todoList.map(item => {
          return (
            <div key={item.id}>
              {item.id}: {item.title}
              <button
                type="button"
                onClick={() => {
                  setPutData({ ...item });
                }}
              >
                상세보기
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteTodo(item.id);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
