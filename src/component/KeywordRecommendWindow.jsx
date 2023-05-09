import styled from 'styled-components';

export const KeywordRecommendWindow = ({ children }) => {
  return (
    <DIV>
      <span>추천검색어</span>
      <ul>{children}</ul>
    </DIV>
  );
};

const DIV = styled.div`
  background-color: white;
`;
