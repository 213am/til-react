# React 프로젝트 생성(Vite)

## 1. 프로젝트 생성 과정

### 1.1. `github Repository` 생성(소문자)

### 1.2. PC 에 `프로젝트 폴더`(소문자) 생성 및 `VSCode` 실행

### 1.3. `Vite` 프로젝트 생성

```bash
npm create vite@latest .
npm create vite@latest 프로젝트명

npm install
```

### 1.4. `git` 작업

```bash
git init

git remote add origin 주소
```

### 1.5. `README.md` 작성

- 실제 프로젝트 관련 내용(AI 로 기본 뼈대 작성하는 방법 권장)

### 1.6. `.env` 환경설정 파일 생성

- `/` 에 `.env` 파일 생성
- `.gitignore` 에 `.env` 파일 추가

```bash
# env
.env
```

### 1.7. `index.html` 수정

- `<html lang="ko"></html>` 수정
- `<title>프로젝트 이름</title>` 수정

### 1.8. 기본 `css` 수정

- `/src/App.css` 내용 전체 삭제
- `/src/index.css`

```css
:root {
  --primary-color: #000000;
  --secondary-color: #0000ff;
  --font-size-base: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: #000000;
}
ul,
li {
  list-style: none;
}
html {
  font-size: 16px;
}
body {
  font-size: var(--font-size-base);
  color: var(--primary-color);
}
/* 웹서비스 개발시 권장함.(개인적으로) */
html,
body,
:root {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
```

### 1.9. `prettier` 설치 및 셋팅

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

- `/` 에 `.prettierrc` 파일 생성

```json
// .prettierrc
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

### 1.10. `eslint` 와 `prettier` 통합 설정

- `eslint.config.js` 수정

```js
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";

export default [
  // dist 폴더는 검사 제외
  { ignores: ["dist"] },
  {
    // 검사할 파일 확장자
    files: ["**/*.{js,jsx}"],
    // 언어 옵션
    languageOptions: {
      ecmaVersion: "latest", // 최신 ECMAScript 문법 사용
      globals: globals.browser, // 브라우저 환경 글로벌 변수 사용
      parserOptions: {
        ecmaFeatures: { jsx: true }, // JSX 문법 활성화
        sourceType: "module", // ES 모듈 사용
      },
    },
    // React 버전 설정
    settings: { react: { version: "18.3" } },
    // 플러그인 설정
    plugins: {
      react, // React 관련 규칙 플러그인
      "react-hooks": reactHooks, // React Hooks 규칙 플러그인
      "react-refresh": reactRefresh, // React Refresh 규칙 플러그인
      prettier, // Prettier 플러그인
    },
    // 규칙 정의
    rules: {
      ...js.configs.recommended.rules, // 기본 JavaScript 권장 규칙
      ...react.configs.recommended.rules, // React 권장 규칙
      ...react.configs["jsx-runtime"].rules, // JSX Runtime 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙
      "react/jsx-no-target-blank": "off", // target="_blank" 관련 규칙 비활성화
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ], // React Fast Refresh 규칙
      "prettier/prettier": "warn", // Prettier 규칙 (포매팅 오류를 에러로 표시)
    },
  },
];
```

### 1.11. `eslint` 테스트

- `App.js` 전체 내용 삭제 후
- `rfce` 입력 후 테스트

```js
function App() {
  const a = 1; // test
  return <div>App</div>;
}
export default App;
```

### 1.12. 실행 테스트

- `npm run dev`

</br>

## 2. `github` 작업

```bash
git add .

git commit

git push origin main
```
