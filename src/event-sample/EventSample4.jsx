import { useState } from "react";

const EventSample3 = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  function HMSTime(time) {
    const hours = Math.floor(time / 3600); // 시 계산
    const minutes = Math.floor((time % 3600) / 60); // 분 계산
    const remainingSeconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  const startTime = () => {
    if (start === false) {
      setStart(true);
      const timeId = setInterval(() => {
        setTime(prevsecond => prevsecond + 1);
      }, 1000);
      setIntervalId(timeId);
    }
  };
  const stopTime = () => {
    if (start === true) {
      setStart(false);
      clearInterval(intervalId);
    }
  };
  const reset = () => {
    setTime(0);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1200px",
        height: "500px",
      }}
    >
      <button onClick={startTime}>시작</button>
      <button onClick={stopTime}>중지</button>
      <button onClick={reset}>타이머 리셋</button>
      <div>{HMSTime(time)}</div>
    </div>
  );
};

export default EventSample3;
