import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import { deleteMember, getMembers, postMember } from "../apis/members";

const Member = () => {
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
    callApiPost({ ...formData });
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
  const getMember = async _id => {
    try {
      const res = await axiosInstance.get(`${API_URL}/${_id}`);
      console.log(res.data);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };

  const putMember = async item => {
    try {
      await axiosInstance.put(`${API_URL}/${item.id}`, item);
      getMembers();
      setIsEdit(false);
    } catch (error) {
      console.log(`오류 발생 : ${error}`);
    }
  };

  // 호출도 하면서 호출된 결과를 state 업데이트
  const callApiMember = async () => {
    const result = await getMembers();
    setMemberList(result);
  };

  const callApiPost = async item => {
    const result = await postMember(item);
    if (result === "success") {
      callApiMember();
    } else {
      alert("다시 시도해주세요.");
    }
  };

  const callApiDelete = async _id => {
    const result = await deleteMember(_id);
    if (result === "success") {
      callApiMember();
    } else {
      alert("다시 시도해주세요.");
    }
  };

  useEffect(() => {
    callApiMember();
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
                      callApiDelete(item.id);
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
