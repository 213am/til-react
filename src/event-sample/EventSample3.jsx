import { useState } from "react";

const EventSample3 = () => {
  const [stopWatch, setStopWatch] = useState(0);
  const [timerFormat, setTimerFormat] = useState("00:00:000");
  const [btClick, setBtClick] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const startBtHandler = () => {
    if (btClick === false) {
      setBtClick(true);
      const timer = setInterval(() => {
        setStopWatch(prev => prev + 1);
      }, 100);
      setTimerId(timer);
      setTimerFormat(`00:00:${stopWatch.toString()}`);
      console.log(stopWatch);
      console.log(timerFormat);
    }
  };
  const stopBtHandler = () => {
    if (btClick === true) {
      setBtClick(false);
      clearInterval(timerId);
    }
  };
  const resetBtHandler = () => {
    setTimerFormat("00:00:00");
  };

  return (
    <>
      <div>{timerFormat}</div>
      <span>
        <button
          onClick={() => {
            startBtHandler();
          }}
        >
          START
        </button>
        <button
          onClick={() => {
            stopBtHandler();
          }}
        >
          STOP
        </button>
        <button
          onClick={() => {
            resetBtHandler();
          }}
        >
          RESET
        </button>
      </span>
    </>
  );
};
export default EventSample3;
