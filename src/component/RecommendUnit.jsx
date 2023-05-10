import styled from 'styled-components';

export const RecommendUnit = ({
  children,
  index,
  focus,
  setFocusIndex,
  setInputValue,
}) => {
  const changeInputToKeyword = e => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const focusChange = () => {
    setFocusIndex(index);
  };

  return (
    <StyledRecommendUnit key={index}>
      <StyledButton
        type="button"
        isActive={focus}
        onClick={changeInputToKeyword}
        onMouseOver={focusChange}
        onFocus={focusChange}
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
  background-color: transparent;
  width: 100%;
  ${({ isActive }) => isActive && `background-color: lightgray;`}
  border: 0;
`;
