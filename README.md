# Grid

- 참고블로그

  - https://studiomeal.com/archives/533
  - https://velog.io/@brgndy/CSS-grid-속성-정리

- 표 레이아웃 만들기에 적합( 칸을 구성하고 배치하는 경우 )

# 실습예제

- App.jsx

```jsx
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>Grid</h1>
      <div className="container">
        <div className="item">A</div>
        <div className="item">B</div>
        <div className="item">C</div>
        <div className="item">D</div>
        <div className="item">E</div>
        <div className="item">F</div>
        <div className="item">G</div>
        <div className="item">H</div>
        <div className="item">I</div>
      </div>
    </div>
  );
};
export default App;
```

- `/src/App.css` 파일 생성

```css
.container {
  display: grid;
  height: 800px;
  /* 셀 가로 */
  /* grid-template-columns: 100px 700px 100px; */
  /* 비율로 설정 */
  /* grid-template-columns: 1fr 6fr 1fr; */
  /* grid 함수 */
  /* grid-template-columns: repeat(3, 1fr); */
  /* 고정된 레이아웃 및 내용 auto */
  grid-template-columns: 200px auto 200px;
  /* 셀 세로 */
  /* grid-template-rows: 100px 650px 100px; */
  grid-template-rows: 1fr 9fr 1fr;
}

.item {
  font-weight: 700;
  border: 2px solid red;
}
```
