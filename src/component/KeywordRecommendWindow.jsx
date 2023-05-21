import { primaryColor } from 'constant';
import styled from 'styled-components';

export const KeywordRecommendWindow = ({ children, showRecommend }) => {
  return (
    <DIV showRecommend={showRecommend}>
      <span>추천검색어</span>
      <ul>{children}</ul>
    </DIV>
  );
};

const DIV = styled.div`
  background-color: white;
  width: 430px;
  position: absolute;
  left: 300px;
  top: 185px;
  border-radius: 25px;
  border: 1px solid ${primaryColor};
  box-shadow: 3px 3px 3px 3px lightgray;
  ${({ showRecommend }) => !showRecommend && `display:none;`}
  padding-top: 1%;
  margin: 0 auto;

  ul {
    padding-left: 0;
  }
`;
