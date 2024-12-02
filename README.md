# React JSX 문법

## 1. Component Props

- 컴포넌트의 `property=값` 으로 작성하면

```jsx
<Box hi={"hello"} age={10} isLogin={false}>
  <a href="#">링크</a>
</Box>
```

- 컴포넌트 내부로 `{ } 객체 리터럴`로 전달된다

```jsx
function Box(props) {
  console.log("객체", props);
  return <div>Box</div>;
}
export default Box;
```

- 만약 컴포넌트 내부에 작성된 내용이 있다면
- `자식` 을 React 에서는 `children` 이라는 `property 명`으로 지정

```jsx
<Box hi={"hello"} age={10} isLogin={false}>
  자식
</Box>
```

- props 의 property 를 이런 방식으로도 사용할 수 있지만, 비추천

```jsx
console.log("객체", props);
console.log("객체", props.hi);
console.log("객체", props.age);
console.log("객체", props.isLogin);
console.log("객체", props.children);
console.log("객체", props["hi"]);
console.log("객체", props["age"]);
console.log("객체", props["isLogin"]);
console.log("객체", props["children"]);
```

- `props` 는 꼭 `Destructuring(객체 구조 분해 할당)` 해서 사용하자

```jsx
function Box({ hi, age, isLogin, children }) {
  return (
    <div>
      <h1>
        내용입니다
        {children}
      </h1>
    </div>
  );
}
export default Box;
```

<br />

## 2. Component 조건문

### 2.1. falthy 한 값은 jsx 에 출력되지 않는다

```jsx
null, undefined, false, 0, "";
```

- if 문을 jsx 내부에서 사용할 수 없음

### 2.2. jsx 에 직접 코딩 가능한 문법

#### 2.2.1. 3항연산자

```jsx
조건 ? true 일 경우 return 값 : false 일 경우 return 값

로그인상태 : {isLogin ? "로그인" : "로그아웃"}
```

#### 2.2.2. 논리연산자

```
조건 && 결과;

나이: {age < 18 && "미성년자";}
```

- 조건이 `참`이면 `뒷내용` 출력
- 조건이 `거짓`이면 ` ` 출력

```
조건 || 결과;

인사: {hi === "hello" || "인사해주세요";}
```

- 조건이 `참`이면 `앞내용` 출력
- 조건이 `거짓`이면 `뒷내용` 출력

#### 2.2.3. 옵셔널 체이닝

- React 에러를 처리해주는 중요한 역할

```
객체?.속성명;

유저레벨: {info?.level;}
아바타: {info?.avatar;}
게임포인트: {info?.point;}
```

### 2.3. `js 로 결과 만든 후 jsx 에 출력하기

#### 2.3.1. if

```jsx
let message;
let nowStatus = status.charAt(0);
if (nowStatus === "2") {
  message = "자료성공";
} else if (nowStatus === "4") {
  message = "Not Found Page";
} else if (nowStatus === "5") {
  message = "Server Shut Down";
} else {
  message = "No No No";
}
```

```jsx
if (fetching === "pending") {
  return (
    <p>
      네트워크가 <b>연결중</b> 입니다.
    </p>
  );
}

if (fetching === "fresh") {
  return (
    <p>
      네트워크가 <b>새로운 데이터</b> 입니다.
    </p>
  );
}

if (fetching === "stale") {
  return (
    <p>
      네트워크가 <b>오래된 데이터</b> 입니다.
    </p>
  );
}
```

#### 2.3.1. switch

```jsx
switch (fetching) {
  case "pending":
    response = (
      <p>
        네트워크가 <b>연결중</b> 입니다.
      </p>
    );
    break;
  case "fresh":
    response = (
      <p>
        네트워크가 <b>새로운 데이터</b> 입니다.
      </p>
    );
    break;
  case "stale":
    response = (
      <p>
        네트워크가 <b>오래된 데이터</b> 입니다.
      </p>
    );
    break;
  default:
    response = (
      <p>
        네트워크가 <b>에러</b> 입니다.
      </p>
    );
    break;
}
```

## 3. 컴포넌트 반복

```js
// 샘플 데이터
const goods = [
  {
    id: 100,
    cate: "과일",
    goodsName: "사과",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 99,
    cate: "과일",
    goodsName: "사과",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 103,
    cate: "전자제품",
    goodsName: "노트북",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 1004,
    cate: "패션",
    goodsName: "바지",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
];
```

```jsx
<Box fruits={fruits} goods={goods} />
```

### 3.1. `map( )` 반복문

```jsx
// Box.jsx
import { GoodsDetailDiv } from "../src/styles/components/common/styled-common.js";

const Box = ({ goods }) => {
  return (
    <div>
      <h1>여기는 레이아웃</h1>
      <div>
        {goods.map(item => {
          return (
            <GoodsDetailDiv key={item?.id}>
              <h3>{item?.cate}</h3>
              <h2>{item?.goodsName}</h2>
              <div>
                <img src={item?.imgUrl} alt={item?.goodsName} />
              </div>
            </GoodsDetailDiv>
          );
        })}
      </div>
    </div>
  );
};
export default Box;
```

- 추천
  : 기능과 화면은 분리하려고 노력하자

```jsx
// Box.jsx
import { GoodsDetailDiv } from "../src/styles/components/common/styled-common.js";

const Box = ({ goods, tickets, tour }) => {
  const renderGoods = datas => {
    const result = datas.map(item => {
      return (
        <GoodsDetailDiv key={item?.id}>
          <h3>{item?.cate}</h3>
          <h2>{item?.goodsName}</h2>
          <div>
            <img src={item?.imgUrl} alt={item?.goodsName} />
          </div>
        </GoodsDetailDiv>
      );
    });
    return result;
  };
  return (
    <div>
      <h1>여기는 레이아웃</h1>
      {/* 상품정보 1 */}
      <div>{renderGoods(goods)}</div>
      {/* 상품정보 2 */}
      <div>{renderGoods(tour)}</div>
      {/* 상품정보 3 */}
      <div>{renderGoods(tickets)}</div>
    </div>
  );
};
export default Box;
```

### 3.2. `forEach` 반복문

```jsx
// forEach Sample
const renderGoodsEach = datas => {
  const tempArr = [];
  datas.forEach(item => {
    const tag = (
      <GoodsDetailDiv key={item?.id}>
        <h3>{item?.cate}</h3>
        <h2>{item?.goodsName}</h2>
        <div>
          <img src={item?.imgUrl} alt={item?.goodsName} />
        </div>
      </GoodsDetailDiv>
    );
    tempArr.push(tag);
  });
  return tempArr;
};
```

## 4. 컴포넌트 state

- 모든 컴포넌트는 `state` 속성을 가지고 있다
- 모든 컴포넌트는 가지고 있는 `state 가 바뀌면 화면을 리렌더링` 한다
- 모든 컴포넌트는 웹브라우저 새로고침 하기 전까지 `state 를 유지`한다

### 4.1. useState 사용 기준

- 리액트 컴포넌트에서 사용하는 변수는 그냥 `useState()`로 생성
- 컴포넌트를 변수를 변경해서 리렌더링이 필요한 경우에도 `useState()` 사용

### 4.2. State 업데이트 시점문제 해결책

```jsx
import { useState } from "react";

const Sample0 = () => {
  console.log("re-rendering");
  // count 를 state 에 보관하고, count 리렌더링 하기
  const [count, setCount] = useState(0);
  const click = () => {
    // 비동기라서 함수완료 후 반영되기 때문에 연속으로 업데이트는 안됨
    // setCount(count + 1);
    // setCount(count + 1);

    setCount(previewCount => previewCount + 1);
    setCount(previewCount => previewCount + 1);
  };

  return (
    <div>
      <h1>현재점수 : {count}</h1>
      <div>
        <button onClick={click}>점수올리기</button>
      </div>
    </div>
  );
};
export default Sample0;
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  console.log("re-rendering");
  // count 를 state 에 보관하고, count 리렌더링 하기
  const [count, setCount] = useState(0);
  const clickAdd = () => {
    setCount(count + 1);
  };
  const clickMinus = () => {
    if (count <= 0) {
      return;
    }
    setCount(count - 1);
  };
  const clickReset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>현재점수 : {count}</h1>
      <div>
        <button onClick={clickAdd}>점수올리기</button>
        <button onClick={clickMinus}>점수내리기</button>
        <button onClick={clickReset}>점수초기화</button>
      </div>
    </div>
  );
};
export default Sample0;
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  // 사용자가 입력한 정보를 기억하기
  const [memo, setMemo] = useState("");

  return (
    <div>
      <h1>입력내용 : {memo}</h1>
      <div>
        <input
          type="text"
          onChange={e => {
            setMemo(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default Sample0;
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  // 할일 목록
  const [todoList, setTodoList] = useState([]);
  // 지금 입력중인 할일
  const [todo, setTodo] = useState("");
  const clickAdd = () => {
    // 목록을 만들어서 업데이트
    setTodoList([...todoList, todo]);
    setTodo("");
  };
  return (
    <div>
      <h1>입력내용 : {todo}</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={e => {
            setTodo(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={clickAdd}>할일 추가</button>
        {todoList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
};
export default Sample0;
```

```jsx
import { useState } from "react";

const Sample1 = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleClick = () => {
    if (userName === "") {
      setErrorMessage("이름을 입력하세요");
      return;
    }
    if (userEmail === "") {
      setErrorMessage("이메일을 입력하세요");
      return;
    }
    if (userPass === "") {
      setErrorMessage("비밀번호를 입력하세요");
      return;
    }
    console.log("로그인 시도 중");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={userPass}
          onChange={e => setUserPass(e.target.value)}
        />
        <br />
        <br />
        <button type="button" onClick={handleClick}>
          로그인
        </button>
      </form>
      <br />
      <div>
        <div style={{ color: "red" }}>Error : {errorMessage}</div>
      </div>
      <br />
      <div>이름 : {userName}</div>
      <div>이메일 : {userEmail}</div>
      <div>비밀번호 : {userPass}</div>
    </div>
  );
};
export default Sample1;
```

```jsx
import { useState } from "react";

const Sample1 = () => {
  // 서버 전송용 데이터 객체 리터럴 관리
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_pass: "",
  });
  // form 의 태그의 props 를 이용해 처리
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [errorMessage, setErrorMessage] = useState("");
  const handleClick = () => {
    if (formData.user_name === "") {
      setErrorMessage("이름을 입력하세요");
      return;
    }
    if (formData.user_email === "") {
      setErrorMessage("이메일을 입력하세요");
      return;
    }
    if (formData.user_pass === "") {
      setErrorMessage("비밀번호를 입력하세요");
      return;
    }
    console.log("로그인 시도 중");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="user_name"
          placeholder="이름을 입력하세요"
          value={formData.user_name}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="email"
          name="user_email"
          placeholder="이메일을 입력하세요"
          value={formData.user_email}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="password"
          name="user_pass"
          placeholder="비밀번호를 입력하세요"
          value={formData.user_pass}
          onChange={e => handleChange(e)}
        />
        <br />
        <br />
        <button type="button" onClick={handleClick}>
          로그인
        </button>
      </form>
      <br />
      <div>
        <div style={{ color: "red" }}>Error : {errorMessage}</div>
      </div>
      <br />
      <div>이름 : {formData.user_name}</div>
      <div>이메일 : {formData.user_email}</div>
      <div>비밀번호 : {formData.user_pass}</div>
    </div>
  );
};
export default Sample1;
```

```jsx
import { useState } from "react";

const Sample2 = () => {
  const [cart, setCart] = useState([]);
  const addCart = str => {
    setCart([...cart, str]);
  };
  const removeCart = _index => {
    const arr = cart.filter((item, index) => _index !== index);
    setCart(arr);
  };
  return (
    <>
      <h1>상품 목록</h1>
      <div>
        <button onClick={() => addCart("사과")}>사과</button>
        <button onClick={() => addCart("바나나")}>바나나</button>
        <button onClick={() => addCart("딸기")}>딸기</button>
        <button onClick={() => addCart("배")}>배</button>
      </div>
      <br />
      <h2>장바구니</h2>
      {cart.length === 0 ? (
        <p>장바구니가 비어있어요</p>
      ) : (
        <ul>
          {cart.map((item, index) => {
            return (
              <li key={index}>
                {item}
                <button onClick={() => removeCart(index)}>x</button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default Sample2;
```

```jsx

```
