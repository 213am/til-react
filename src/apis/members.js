import { API_URL, axiosInstance } from "./config";

// API method

// 데이터 불러오기
export const getMembers = async () => {
  try {
    const res = await axiosInstance.get(API_URL);
    console.log(`결과 : ${res.status}`);
    // 정상적으로 데이터를 불러왔을때
    // 2xx 의 status 코드는 성공
    // 따라서 status 코드를 문자열로 변환하고 그 중 첫번째 자리 숫자를 가져와서 비교
    const responseStatus = res.status.toString().charAt(0);
    if (responseStatus === "2") {
      return res.data;
    } else {
      console.log("데이터가 없어요.");
      return [];
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
    return [];
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
export const postMember = async item => {
  try {
    await axiosInstance.post(API_URL, item);
    return "success";
  } catch (error) {
    console.log(`오류 발생 : ${error}`);
    return "fail";
  }
};
// 데이터 삭제
export const deleteMember = async _id => {
  try {
    const res = await axiosInstance.delete(`${API_URL}/${_id}`);
    return "success";
  } catch (error) {
    console.log(`오류 발생 : ${error}`);
    return "fail";
  }
};
export const putMember = async item => {
  try {
    await axiosInstance.put(`${API_URL}/${item.id}`, item);
    getMembers();
    setIsEdit(false);
  } catch (error) {
    console.log(`오류 발생 : ${error}`);
  }
};
