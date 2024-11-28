import { useState } from "react";

const EventSample1 = () => {
  const initData = {
    now: 1,
    userid: "",
    useremail: "",
    userpass: "",
    userpassconfirm: "",
    age: 0,
    gender: "male",
    area: "daegu",
    birthday: "2024-11-28",
    introduce: "",
    picture: null,
    document: null,
    hobby: ["잠자기"],
  };
  const [formData, setFormData] = useState({ initData });
  const [idCheck, setIdCheck] = useState(false);

  const changeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const clickHandler = () => {};
  const submitHandler = e => {
    e.preventDefault();
  };
  const keyDownHandler = () => {};
  const idCheckHandler = () => {};

  return (
    <div>
      <h1>회원가입</h1>
      <form
        onSubmit={e => {
          submitHandler(e);
        }}
      >
        {/* 숨긴 query string */}
        <input type="hidden" name="now" value={formData.now} />
        {/* 회원가입 기본정보 입력영역 */}
        <fieldset>
          <legend>기본정보</legend>
          <div>
            <label htmlFor="userId">ID</label>
            <input
              type="text"
              name="userid"
              value={formData.userid}
              id="userId"
              className="userId"
              placeholder="아이디를 입력하세요"
              maxLength={8}
              minLength={4}
              onChange={e => {
                changeHandler(e);
              }}
            />
            <button
              type="button"
              onClick={() => {
                alert(
                  `${formData.userid}를 들고 백엔드 갔다왔더니 중복 아니랍니다`,
                );
                setIdCheck(true);
              }}
            >
              중복확인
            </button>
          </div>
          <div>
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              name="useremail"
              value={formData.useremail}
              id="userEmail"
              placeholder="이메일을 입력하세요"
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="userPass">비밀번호</label>
            <input
              type="password"
              name="userpass"
              value={formData.userpass}
              id="userPass"
              placeholder="비밀번호를 입력하세요"
              autoComplete="off"
              maxLength={16}
              minLength={8}
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="userPassConfirm">비밀번호 확인</label>
            <input
              type="password"
              name="userpassconfirm"
              value={formData.userpassconfirm}
              id="userPassConfirm"
              placeholder="비밀번호 확인"
              autoComplete="off"
              maxLength={16}
              minLength={8}
              onChange={e => {
                changeHandler(e);
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (formData.userpass !== e.target.value) {
                    alert("비밀번호가 서로 다릅니다");
                    setFormData({ ...formData, [e.target.name]: "" });
                  }
                }
              }}
            />
          </div>
        </fieldset>
        {/* 회원가입 부가정보 입력영역 */}
        <fieldset>
          <legend>부가정보</legend>
          <div>
            <label htmlFor="age">나이</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label>성별</label>
            <label htmlFor="male">남성</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              //   defaultChecked
              checked={formData.gender === "male"}
              onChange={e => {
                changeHandler(e);
              }}
            />
            <label htmlFor="female">여성</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={formData.gender === "female"}
              onChange={e => {
                changeHandler(e);
              }}
            />
            <label htmlFor="etc">기타</label>
            <input
              type="radio"
              name="gender"
              id="etc"
              value="etc"
              checked={formData.gender === "etc"}
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="area">지역</label>
            <select
              name="area"
              id="area"
              value={formData.area}
              onChange={e => {
                changeHandler(e);
              }}
            >
              <option value="">전체</option>
              <option value="daegu">대구</option>
              <option value="gwangju">광주</option>
              <option value="busan">부산</option>
              <option value="jeju">제주</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthday">생일</label>
            <input
              type="date"
              name="birthday"
              id="birthday"
              value={formData.birthday}
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="introduce">자기소개</label>
            <textarea
              name="introduce"
              id="introduce"
              value={formData.introduce}
              rows={4}
              cols={50}
              style={{ resize: "vertical" }}
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="picture">이미지</label>
            <input
              type="file"
              name="picture"
              id="picture"
              value={formData.picture}
              accept="image/png, image/jpeg"
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="document">문서</label>
            <input
              type="file"
              name="document"
              id="document"
              value={formData.document}
              multiple
              onChange={e => {
                changeHandler(e);
              }}
            />
          </div>
          <div>
            <label>취미 : 배열의 A 또는 B 또는 C 등등...</label>
            <label htmlFor="sleep">잠자기</label>
            <input
              type="checkbox"
              name="hobby"
              id="sleep"
              value={formData.hobby}
              defaultChecked
            />
            <label htmlFor="golf">골프</label>
            <input type="checkbox" name="hobby" id="golf" value="골프" />
            <label htmlFor="soccer">축구</label>
            <input type="checkbox" name="hobby" id="soccer" value="축구" />
            <label htmlFor="basketball">농구</label>
            <input type="checkbox" name="hobby" id="basketball" value="농구" />
            <label htmlFor="volleyball">배구</label>
            <input type="checkbox" name="hobby" id="volleyball" value="배구" />
            <label htmlFor="baseball">야구</label>
            <input type="checkbox" name="hobby" id="baseball" value="야구" />
          </div>
        </fieldset>
        <div>
          <button
            type="button"
            onClick={() => {
              setFormData(initData);
            }}
          >
            다시 작성
          </button>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};
export default EventSample1;
