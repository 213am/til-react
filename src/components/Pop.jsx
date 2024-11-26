import styled from "@emotion/styled";

const PopupTitle = styled.h1`
  color: hotpink;
  font-size: ${props => props.size || 20}px;
  text-align: center;
`;
const PopupContent = styled.p``;
const SlideDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
`;
const BannerDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.w || 100}px;
  height: ${props => props.h || 100}px;
  background-color: ${props => props.bg || "red"};
`;
const NoticeDiv = styled.div``;

const Pop = () => {
  const title = "팝업 제목";
  const data = "팝업 내용";

  return (
    <>
      <PopupTitle>{title}</PopupTitle>
      <PopupContent>{data}</PopupContent>
      <SlideDiv>슬라이드</SlideDiv>
      <BannerDiv bg={"yellow"} w={200} h={200}>
        배너
      </BannerDiv>
      <BannerDiv bg={"orange"} w={50} h={50}>
        배너 2
      </BannerDiv>
      <BannerDiv>배너 3</BannerDiv>
      <NoticeDiv>공지사항</NoticeDiv>
    </>
  );
};

export default Pop;
