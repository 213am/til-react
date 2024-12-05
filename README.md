# 리소스 최적화

- image, font 등

## 1. image

- `/public` 경로에 있는 것은 원본을 유지한다.
- `/src/assets` 경로에 있는 것은 압축한다.(웹브라우저도 캐시로 보관)
- 용도에 맞게 판단하자
- `/src/assets`에 보관하고 사용하는 경우가 일반적

## 2. font

- font 는 가능하면 `웹폰트 URL` 을 사용하자
- `구글 폰트` 또는 `눈누`에 `웹폰트 URL` 이 없는 경우 직접 파일 설정
- `파일`인 경우 `public 폴더`에 넣어두고 활용하자
- `/src/assets` 에 두면 설정할 것이 많음
- 눈누<https://noonnu.cc/font_page/pick>
- 구글폰트<https://fonts.google.com/>

### 2.1. `/public 폴더`에 파일 배치 후 `index.css` 설정

```css
/* 글꼴 설정 */
@font-face {
  font-family: "chab";
  src: url("/chab.ttf");
}
@font-face {
  font-family: "ddag";
  src: url("/ddag.ttf");
}

body {
  font-family: "chab";
  font-size: var(--font-size-base);
  color: var(--primary-color);
}
```

# 빌드하기

- 배포 버전 생성 : `npm run build`
- 배포 버전 테스트 : `npm run preview`
