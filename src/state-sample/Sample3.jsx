import { useState } from "react";

const Sample3 = () => {
  const [popup, setPopup] = useState(false);
  const popupCSS = {
    display: popup ? "block" : "none",
    position: "absolute",
    left: "200px",
    top: "150px",
    width: "500px",
    height: "450px",
    backgroundColor: "brown",
  };

  return (
    <>
      <button onClick={() => setPopup(true)}>보기</button>
      <div style={popupCSS}>
        팝업창
        <button onClick={() => setPopup(false)}>창닫기</button>
      </div>
    </>
  );
};
export default Sample3;
