import { createContext, useState } from "react";

export const UserInfoContext = createContext();
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });
  // return {값, 기능 목록등...}
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {/* 지역범위 */}
      {children}
    </UserInfoContext.Provider>
  );
};
