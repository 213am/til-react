import { memo } from "react";

const Child = ({ count, setCount }) => {
  console.log("Child : 리렌더링", count, setCount);

  return <div>Child</div>;
};
export default memo(Child);
