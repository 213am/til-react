import styled from "@emotion/styled";
import { useState } from "react";

const ConfirmText = styled.p`
  color: ${props => props.fontColor || "black"};
`;

const EventSample2 = () => {
  const initText = "기대하지 않는 자는 실망하지도 않을 것이다.";
  const extext = initText.charCodeAt(1);
  console.log(extext);
  const [typingText, setTypingText] = useState("");
  const [isCorrect, setIsCorrect] = useState("");
  const [txtColor, setTxtColor] = useState("");

  return (
    <>
      <div>
        <label htmlFor="typingArea">{initText}</label>
        <br />
        <ConfirmText fontColor={txtColor}>{typingText}</ConfirmText>
        <br />
        <input
          type="text"
          name="typingarea"
          id="typingArea"
          value={typingText}
          onChange={e => {
            console.log(e.target.value);
            setTypingText(e.target.value);
          }}
        />
      </div>
    </>
  );
};
export default EventSample2;
