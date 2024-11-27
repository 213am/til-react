import { useState } from "react";

const Sample2 = () => {
  const [isDark, setIsDark] = useState(false);
  const ThemeCSS = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    backgroundColor: isDark ? "#000" : "#fff",
    transition: "all 0.5s",
  };

  return (
    <div style={ThemeCSS}>
      <button
        onClick={() => {
          setIsDark(!isDark);
        }}
      >
        테마변경
      </button>
    </div>
  );
};
export default Sample2;
