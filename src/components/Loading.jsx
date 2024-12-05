import styled from "@emotion/styled";
import { PacmanLoader } from "react-spinners";

const LodingDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <LodingDiv>
      <PacmanLoader color="#f7f54a" size={50} speedMultiplier={2} />
    </LodingDiv>
  );
};
export default Loading;
