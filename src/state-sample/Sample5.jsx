import { useState } from "react";

const Sample5 = () => {
    const [bgColor, setBgColor] = useState("");
    const changeColor = (color) => {
      setBgColor(color)
    }

  return (
    <>
     <div style={{ backgroundColor: bgColor, width:"100%", height:"100vh" }}>
      <div>색상이 바뀌어요</div>
      <button onClick={() => changeColor("red")}>빨강</button>
      <button onClick={() => changeColor("yellow")}>노랑</button>
      <button onClick={() => changeColor("blue")}>파랑</button>
    </div>
    </>
  );
};
export default Sample5;
