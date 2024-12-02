import { useState } from "react";

const Sample4 = () => {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);

  const clickLike = () => {
    setLike(like + 1);
  };
  const clickDisLike = () => {
    // if (disLike <= 0) {
    //   return;
    // }
    setDisLike(disLike + 1);
  };
  return (
    <>
      <div>
        <span>좋아요 {like}</span>
        <span>싫어요 {disLike}</span>
      </div>
      <button onClick={clickLike}>좋아요</button>
      <button onClick={clickDisLike}>싫어요</button>
    </>
  );
};
export default Sample4;
