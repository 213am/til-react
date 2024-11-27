import { useState } from "react";

const Sample3 = () => {
  const [popup, setPopup] = useState(false);
  const popupCSS = {
    display: popup ? "block" : "none",
    position:"absolute",
    top: "300px",
    left:"500px",
    width:"500px",
    height:"450px",
    border: "1px solid black",
    backgroundColor:"brown"
  };

  return (
    <>
     <button onClick={() => setPopup(true)}>보기</button>
      <div style={popupCSS}>
        팝업창
        <button
          onClick={() => setPopup(false)}
        >
          창닫기
        </button>
      </div>
    </>
  );
};
export default Sample3;
