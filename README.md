# Axios 활용

- https://axios-http.com/kr/docs/intro
- `npm install axios`

## 1. 기본 사용법

```jsx
import axios from "axios";
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
      const res = await axios.get(API_URL);
      setMemberList(res.data);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };
  const getMember = async _id => {
    try {
      const res = await axios.get(`${API_URL}/${_id}`);
      console.log(res.data);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };
  const postMember = async item => {
    try {
      await axios.post(API_URL, item);
      getMembers();
      setFormData(initData);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };
  const deleteMember = async _id => {
    try {
      await axios.delete(`${API_URL}/${_id}`);
      getMembers();
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };
  const putMember = async item => {
    try {
      await axios.put(`${API_URL}/${item.id}`, item);
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

<br/>

## 2. 예외 및 에러 처리

- 우리가 fetch 또는 axios 를 활용해서 request 하면
- API 백엔드 서버는 response 를 합니다.

```json
{
  // `data`는 서버가 제공하는 응답입니다.
  "data": {},

  // `status`는 HTTP 상태 코드입니다.
  "status": 200,

  // `statusText`는 HTTP 상태 메시지입니다.
  "statusText": "OK",

  // `headers`는 HTTP 헤더입니다.
  // 모든 헤더 이름은 소문자이며, 괄호 표기법을 사용하여 접근할 수 있습니다.
  // 예시: `response.headers['content-type']`
  "headers": {},

  // `config`는 요청을 위해 `Axios`가 제공하는 구성입니다.
  "config": {},

  // `request`는 이번 응답으로 생성된 요청입니다.
  // 이것은 node.js에서 마지막 ClientRequest 인스턴스 입니다.
  // 브라우저에서는 XMLHttpRequest입니다.
  "request": {}
}
```

### 2.1. Status Code 참고문서

> https://developer.mozilla.org/ko/docs/Web/HTTP/Status

```jsx
const getMembers = async () => {
  try {
    const res = await axios.get(API_URL);
    console.log(res.status);
    // 정상적으로 데이터를 불러왔을때
    // 2xx 의 status 코드는 성공
    // 따라서 status 코드를 문자열로 변환하고 그 중 첫번째 자리 숫자를 가져와서 비교
    const responseStatus = res.status.toString().charAt(0);
    if (responseStatus === "2") {
      setMemberList(res.data);
    } else {
      console.log("데이터가 없어요");
    }
  } catch (error) {
    // 만약 404 혹은 4xx 라면 프론트엔드의 코드에서 원인을 먼저 찾아보자
    const errorStatus = error.response.status.toString().charAt(0);
    if (errorStatus === "5") {
      alert("서버가 꺼졌어요.");
    }
    if (errorStatus === "4") {
      alert("호출에 실패했습니다.");
    }
    console.log(`오류 발생 : ${error}`);
  }
};
```

### 2.2. 백엔드 협업 시 (예: axios, fetch 등) 코딩 컨벤션

- `/src/apis/` 폴더 생성 권장
- `/src/apis/config.js` 파일 생성 권장

```jsx
import axios from "axios";

export const API_URL = `http://localhost:5000/members`;

export const axiosInstance = new axios();
```

- `/src/apis/todos.js` 기능별 파일 생성
- `/src/apis/diary.js` 기능별 파일 생성
- `/src/apis/members.js` 기능별 파일 생성

```jsx
import { API_URL, axiosInstance } from "./config";

// API method
export const getMembers = async setMemberList => {
  try {
    const res = await axiosInstance.get(API_URL);
    console.log(res.status);
    // 정상적으로 데이터를 불러왔을때
    // 2xx 의 status 코드는 성공
    // 따라서 status 코드를 문자열로 변환하고 그 중 첫번째 자리 숫자를 가져와서 비교
    const responseStatus = res.status.toString().charAt(0);
    if (responseStatus === "2") {
      setMemberList(res.data);
    } else {
      console.log("데이터가 없어요");
    }
  } catch (error) {
    // 만약 404 혹은 4xx 라면 프론트엔드의 코드에서 원인을 먼저 찾아보자
    const errorStatus = error.response.status.toString().charAt(0);
    if (errorStatus === "5") {
      alert("서버가 꺼졌어요.");
    }
    if (errorStatus === "4") {
      alert("호출에 실패했습니다.");
    }
    console.log(`오류 발생 : ${error}`);
  }
};
export const getMember = async _id => {
  try {
    const res = await axiosInstance.get(`${API_URL}/${_id}`);
    console.log(res.data);
  } catch (error) {
    console.log(`오류 발생 : ${error}`);
  }
};
```

### 2.3. package.json 수정(proxy 설정)

> "proxy": "백엔드 ip 주소"

### 2.4. 향후 시간이 지나면서 코드 고도화를 시도

- 1단계 : API 호출과 화면갱신. 즉, state 관리를 .jsx 에서 작성
- 2단계 : API 호출을 별도파일로 분리, state 관리도 옮겨보고
- 3단계 : API 호출은 js 에서 진행하고 그 결과를 return 받아서 jsx 에서 처리하도록
