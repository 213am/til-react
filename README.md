# json-server

- fake 서버

## 자료

- [json-server](https://www.npmjs.com/package/json-server)
- [블로그](https://poiemaweb.com/json-server)

## 프로젝트 폴더 생성

- `/server` 폴더 생성
- 터미널에 `cd server` 로 터미널 프롬프트 이동
- `npm init -y`
- `npm install -g json-server`
- server 폴더에 `db.json` 파일 생성

```json
{
  "todos": [
    { "id": "1", "title": "리액트공부", "content": "axios 공부하자" },
    { "id": "2", "title": "postman 공부", "content": "사용법 공부하자" }
  ]
}
```

## 서버 실행해보기

- `json-server --watch db.json --port 5000` 포트를 5000으로 변경
- `package.json` 수정

```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 기본 포트를 5000으로 변경
    "start": "json-server --watch db.json --port 5000"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "json-server": "^1.0.0-beta.3"
  }
}
```

- `npm run start` 로 실행

# Postman 으로 API 테스트하기
