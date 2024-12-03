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
