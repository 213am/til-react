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
