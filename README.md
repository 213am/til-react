# fetch 로 REST API 연동해 보기

new XHR(**X**ml **H**ttp **R**equest)

- `async ... await` 로 비동기처리

## 1. 사전 조건 : 백엔드 서버가 활성화

- 터미널에 prompt 현재 폴더가 server 여야 함
- `npm run start` 실행
- `http://192.168.0.66:5000/todos`
- `{"title": " ", "content": " "}`

## 2. fetch 로 데이터 연동하기

- `jwt(Javascript Web Token)` 인증없이 진행인 경우
- `/src/todos/` 폴더 생성
- `/src/main.jsx` import

```jsx
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
```

```jsx
import { useEffect, useState } from "react";

const Member = () => {
  const API_URL = `http://localhost:5000/members`;
  const initData = {
    email: "",
    pw: "",
  };
  const [memberList, setMemberList] = useState([]);
  const [formData, setFormData] = useState(initData);
  const selectData = {
    id: "",
    email: "",
    pw: "",
  };
  const [selectUser, setSelectUser] = useState(selectData);
  const [isEdit, setIsEdit] = useState(false);
  // event handler
  const changeHandler = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = e => {
    e.preventDefault();
    postMember({ ...formData });
  };

  const handleChangeEdit = e => {
    const { name, value } = e.target;
    setSelectUser({ ...selectUser, [name]: value });
  };
  const editSubmitHandler = e => {
    e.preventDefault();
    putMember({ ...selectUser });
  };

  // API method
  const getMembers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMemberList(data);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };
  const getMember = () => {};
  const postMember = async item => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      getMembers();
      setFormData(initData);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };
  const deleteMember = async _id => {
    try {
      await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });
      getMembers();
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };
  const putMember = async item => {
    try {
      await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      getMembers();
      setIsEdit(false);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };

  useEffect(() => {
    getMembers();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <label>회원가입</label>
        <form
          onSubmit={e => {
            submitHandler(e);
          }}
        >
          <div>
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <br />
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              name="pw"
              value={formData.pw}
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <br />
          <button type="submit">회원가입</button>
        </form>
        <div>
          <h1>Member 관리</h1>
          <div>
            {memberList.map(item => {
              return (
                <div key={item.id}>
                  <div
                    onClick={() => {
                      setSelectUser({ ...item });
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "yellowgreen",
                    }}
                  >
                    <div>{item?.id}</div>
                    <div>{item?.email}</div>
                  </div>

                  <button
                    onClick={() => {
                      deleteMember(item.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3>상세 회원정보</h3>
          {selectUser?.id !== "" ? (
            <div>
              <form
                onSubmit={e => {
                  editSubmitHandler(e);
                }}
              >
                이메일
                <input
                  type="email"
                  name="email"
                  value={selectUser.email}
                  onChange={e => {
                    handleChangeEdit(e);
                  }}
                  readOnly={!isEdit}
                  disabled={!isEdit}
                />
                <br />
                비밀번호
                <input
                  type="password"
                  name="pw"
                  value={selectUser.pw}
                  onChange={e => {
                    handleChangeEdit(e);
                  }}
                  readOnly={!isEdit}
                  disabled={!isEdit}
                />
              </form>
              <br />
              {isEdit ? (
                <button type="submit">정보수정</button>
              ) : (
                <button type="button">정보수정 취소</button>
              )}
            </div>
          ) : (
            "선택된 회원이 없습니다."
          )}
        </div>
      </div>
    </>
  );
};

export default Member;
```
