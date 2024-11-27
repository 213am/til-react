import styled from "@emotion/styled";

//  바로가기 영역의 CSS-in-JS
export const LinkDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 3);
  height: 100%;
  background-color: ${props => props.bc || "tan"};
`;

// 제품 출력 css
export const GoodsDetailDiv = styled.div`
  h3 {
    color: brown;
  }
  img {
    width: 200px;
  }
`;
