# Context API

- 용도
  : 웹 앱서비스에서 기본적으로 관리할 자료 보관 및 처리
  : 사용자 로그인 정보
  : 테마
  : 장바구니 등

- 특징
  : 개별 컴포넌트의 state 가 아니고, 앱 전체의 state
  : context 로도 충분하지만, 좀 더 복잡한 데이터 처리 라이브러리가 많음
  : Redux(난이도 가장 높음)
  : Recoil(난이도가 비교적 낮고, 국내에서 활성화)
  : Zustand(난이도가 비교적 낮고, 해외에서 활성화, 국내에서도 활성화 중)

## useState 로 state 관리

- useState 는 각각의 컴포넌트가 state 를 관리하는 형식
- Drilling 으로 인한 문제점을 이해해보자

```jsx
import { useState } from "react";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>로고</p>
        <nav>
          {userInfo.userId === "" ? (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "hong",
                    userName: "gildong",
                    userRole: "MEMBER",
                  });
                }}
              >
                로그인
              </button>
              <button onClick={() => {}}>회원가입</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userid: "",
                    userName: "",
                    userRole: "GUEST",
                  });
                }}
              >
                로그아웃
              </button>
              <button onClick={() => {}}>
                {userInfo.userName}님의 정보수정
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
const Footer = ({ userInfo }) => {
  return <footer>하단 {userInfo.userRole}</footer>;
};
const Main = ({ userInfo }) => {
  return (
    <main>
      {userInfo.userId === "" ? (
        <div>로그인 하셔야 서비스 이용이 가능합니다</div>
      ) : (
        <div>
          <Character userInfo={userInfo} />
          <Friend userInfo={userInfo} />
          <Point userInfo={userInfo} />
          <Map userInfo={userInfo} />
          <FAQ userInfo={userInfo} />
        </div>
      )}
    </main>
  );
};

const Character = ({ userInfo }) => {
  return (
    <div>
      <div>{userInfo.userName}님의 캐릭터 변경 서비스</div>
      <ChoiceCharacter />
    </div>
  );
};
const ChoiceCharacter = ({ userInfo }) => {
  return <div>캐릭터 종류 선택</div>;
};
const Friend = ({ userInfo }) => {
  return <div>{userInfo.userName}님의 친구 관리 서비스</div>;
};
const Point = ({ userInfo }) => {
  return <div>{userInfo.userName}님의 포인트 구매 서비스</div>;
};
const Map = ({ userInfo }) => {
  return <div>{userInfo.userName}님의 주변 검색 서비스</div>;
};
const FAQ = ({ userInfo }) => {
  return <div>{userInfo.userName}님의 고객센터 QnA 서비스</div>;
};

function App() {
  // useState 로 로그인한 사용자 정보 관리
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });

  return (
    <div>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <Main userInfo={userInfo} />
      <Footer userInfo={userInfo} />
    </div>
  );
}
export default App;
```

## Context API 활용

### 추천 폴더 구조

- `/src/contexts` 폴더 생성을 권장
  : context 는 `문맥`, `일관성`, `목표` 라고 함
  : context 는 `프로그램의 전체 목표를 이루기 위한 흐름`

### 추천 파일

- `/src/contexts` 폴더에 파일 생성
- 예시
  : ThemeContext.jsx // 테마관련
  : BucketContext.jsx // 장바구니
  : UserInfoContext.jsx // 유저정보

```jsx
import { createContext, useState } from "react";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });

  return (
    <UserInfoContext.Provider
      value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
```

- App.jsx 반영

```jsx
import { useContext } from "react";
import { UserInfoContext, UserInfoProvider } from "./contexts/UserInfoContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>로고</p>
        <nav>
          {userInfo.userRole === "GUEST" ? (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "hong",
                    userName: "gildong",
                    userRole: "MEMBER",
                  });
                }}
              >
                로그인
              </button>
              <button onClick={() => {}}>회원가입</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userid: "",
                    userName: "",
                    userRole: "GUEST",
                  });
                }}
              >
                로그아웃
              </button>
              <button onClick={() => {}}>
                {userInfo.userName}님의 정보수정
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
const Footer = () => {
  const { userInfo } = useContext(UserInfoContext);

  return <footer>하단 {userInfo.userRole}</footer>;
};
const Main = () => {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <main>
      {userInfo.userRole === "GUEST" ? (
        <div>로그인 하셔야 서비스 이용이 가능합니다</div>
      ) : (
        <>
          <Character />
          <Friend />
          <Point />
          <Map />
          <FAQ />
        </>
      )}
    </main>
  );
};

const Character = () => {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <div>
      <div>{userInfo.userName}님의 캐릭터 변경 서비스</div>
      <ChoiceCharacter />
    </div>
  );
};
const ChoiceCharacter = () => {
  return <div>캐릭터 종류 선택</div>;
};
const Friend = () => {
  const { userInfo } = useContext(UserInfoContext);

  return <div>{userInfo.userName}님의 친구 관리 서비스</div>;
};
const Point = () => {
  const { userInfo } = useContext(UserInfoContext);

  return <div>{userInfo.userName}님의 포인트 구매 서비스</div>;
};
const Map = () => {
  const { userInfo } = useContext(UserInfoContext);

  return <div>{userInfo.userName}님의 주변 검색 서비스</div>;
};
const FAQ = () => {
  const { userInfo } = useContext(UserInfoContext);

  return <div>{userInfo.userName}님의 고객센터 QnA 서비스</div>;
};

function App() {
  // useState 로 로그인한 사용자 정보 관리

  return (
    <div>
      <UserInfoProvider>
        <Header />
        <Main />
        <Footer />
      </UserInfoProvider>
    </div>
  );
}
export default App;
```
