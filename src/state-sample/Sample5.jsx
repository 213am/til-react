import styled from "@emotion/styled";
import { useState } from "react";

const ColorDiv = styled.div`
  background-color: ${props => props.bg || "yellowgreen"};
`;
const Sample5 = () => {
  const [bgColor, setBgColor] = useState("");

  return (
    <>
      <ColorDiv bg={bgColor}>
        <div>색상이 바뀌어요</div>
        <button onClick={() => setBgColor("red")}>빨강</button>
        <button onClick={() => setBgColor("yellow")}>노랑</button>
        <button onClick={() => setBgColor("blue")}>파랑</button>
      </ColorDiv>
    </>
  );
};
export default Sample5;
