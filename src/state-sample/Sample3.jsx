import { useState } from "react";

const Sample3 = () => {
  const [popup, setPopup] = useState(false);
  const popupCSS = {
    visible: !popup ? "none" : "visible",
  };

  return (
    <>
      <button onClick={popup}>보기</button>
      <div style={popupCSS}>
        팝업창
        <button
          onClick={() => {
            setPopup(!popup);
          }}
        >
          창닫기
        </button>
      </div>
    </>
  );
};
export default Sample3;
