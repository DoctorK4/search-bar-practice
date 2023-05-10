import styled from 'styled-components';

export const RecommendUnit = ({ children, focus, setInputValue }) => {
  const changeInputToKeyword = e => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  return (
    <StyledRecommendUnit>
      <StyledButton
        type="button"
        isActive={focus}
        onClick={changeInputToKeyword}
      >
        {children}
      </StyledButton>
    </StyledRecommendUnit>
  );
};

export const StyledRecommendUnit = styled.li`
  list-style-type: none;
  width: 100%;
  background-color: white;
  z-index: 3;
  position: relative;
`;

const StyledButton = styled.button`
  ${({ isActive }) => isActive && `background-color: lightgray;`}
  border: 0;
`;
