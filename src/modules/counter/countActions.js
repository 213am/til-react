import { ADD, MINUS, RESET } from "./countTypes";

// Action 은 상태를 업데이트하는 과정
export const add = () => ({ type: ADD });
export const minus = () => ({ type: MINUS });
export const reset = () => ({ type: RESET });
