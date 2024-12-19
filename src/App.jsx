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
