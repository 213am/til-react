import styled from "@emotion/styled";
import { useState } from "react";

const Sample4 = () => {
  //할일 목록
  // 지금 입력중인 할일
  // 목록을 만들어서 업데이트
  // 삭제버튼 삭제
  const ContainerDiv = styled.div`
    width: 100%;
    height: 100vh;
    background-color: pink;
    display: flex;
    justify-content: center;
  `;
  const WrapDiv = styled.div`
    max-width: 1024px;
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  `;
  const TextAreaDiv = styled.div`
    border-bottom: 1px solid #bbb;
    background-color: #eee;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      font-size: 20px;
      color: #333;

      ~ input {
        border: 1px solid #dbdbdb;
        width: 80%;
        padding: 10px;
        min-width: 400px;
        margin: 0 15px;
      }
    }
    button {
      width: 38px;
      height: 38px;
      background-color: pink;
      font-size: 25px;
      transition: all.3s;
      &:hover {
        background-color: hotpink;
      }
    }
  `;
  const TodoListDiv = styled.div`
    padding: 30px;
    height: calc(100% - 99px);
    margin: 0 auto;
    ul {
      li {
        border: 1px solid #ddd;
        border-top-color: transparent;
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        &:first-of-type {
          border-top-color: #ddd;
        }
        span {
          font-size: 16px;
          color: #333;
          display: flex;
          align-items: center;
          max-width: 60%;
        }
        button {
          width: 38px;
          height: 38px;
          color: #555;
          font-size: 32px;
          transition: all 0.3s;
          &:hover {
            color: red;
            background-color: #ddd;
          }
        }
      }
    }
  `;

  const [todo, setTodo] = useState("");
  const [userTodoList, setUserTodoList] = useState([]);
  const userInput = e => {
    const { value } = e.target;
    setTodo(value);
    console.log(value);
  };
  const addTodo = () => {
    setUserTodoList([...userTodoList, todo]);
    setTodo("");
  };
  const addTodoEnter = e => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const deleteItem = _index => {
    const arr = userTodoList.filter((item, index) => _index !== index);
    setUserTodoList(arr);
  };
  console.log(userTodoList);
  return (
    <ContainerDiv>
      <WrapDiv>
        <TextAreaDiv>
          <label htmlFor="userInput">할일</label>
          <input
            type="text"
            value={todo}
            id="userInput"
            onChange={e => {
              userInput(e);
            }}
            onKeyDown={e => addTodoEnter(e)}
          />
          <button
            onClick={() => {
              addTodo();
            }}
          >
            +
          </button>
        </TextAreaDiv>
        <TodoListDiv>
          <ul>
            {userTodoList.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item}</span>
                  <button
                    onClick={() => {
                      deleteItem(index);
                    }}
                  >
                    -
                  </button>
                </li>
              );
            })}
          </ul>
        </TodoListDiv>
      </WrapDiv>
    </ContainerDiv>
  );
};

export default Sample4;
