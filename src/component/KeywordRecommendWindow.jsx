import styled from 'styled-components';

export const KeywordRecommendWindow = ({ children, setShowRecommend }) => {
  return (
    <DIV setShowRecommend={setShowRecommend}>
      <span>추천검색어</span>
      <ul>{children}</ul>
    </DIV>
  );
};

const DIV = styled.div`
  background-color: white;
  width: 22.5%;
  position: absolute;
  left: 37.5%;
  top: 45%;
  border-radius: 25px;
  border: 1px solid black;
  ${({ setShowRecommend }) => setShowRecommend && `display:none;`}

  ul {
    padding-left: 0;
  }
`;
