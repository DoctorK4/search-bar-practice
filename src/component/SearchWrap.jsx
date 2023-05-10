import { getRecommendData } from 'api/getRecommendData';
import {
  Button,
  Input,
  RecommendUnit,
  KeywordRecommendWindow,
  Wrapper,
  StyledRecommendUnit,
} from 'component/';
import { debounceTime, maxListLength } from 'constant';
import { useEffect, useState } from 'react';

export const SearchWrap = () => {
  const buttonType = 'submit';
  const [inputValue, setInputValue] = useState('');
  const [recommendList, setRecommendList] = useState([]);
  const [focusIndex, setFocusIndex] = useState(-1);
  const handleValue = async e => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleFocus = event => {
    if (inputValue && event.key === 'ArrowDown') {
      if (focusIndex < recommendList.length - 1) {
        setFocusIndex(focusIndex + 1);
        console.log(focusIndex);
      } else {
        setFocusIndex(0);
        console.log(focusIndex);
      }
    }
    if (inputValue && event.key === 'ArrowUp') {
      if (focusIndex > 0) {
        setFocusIndex(prev => prev - 1);
        console.log(focusIndex);
      } else {
        setFocusIndex(recommendList.length - 1);
        console.log(focusIndex);
      }
    }
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      const inputValueCache = localStorage.getItem(inputValue);
      if (inputValue && !inputValueCache) {
        const newList = await getRecommendData(inputValue);
        if (newList.length > 0) {
          localStorage.setItem(inputValue, JSON.stringify(newList));
          // return;
        }
        if (newList.length <= maxListLength) {
          setRecommendList(newList);
          // return;
        }
        if (newList.length > maxListLength) {
          setRecommendList(newList.slice(0, maxListLength));
          // return;
        }
      }
      if (inputValue && inputValueCache) {
        const cached = JSON.parse(inputValueCache);
        // eslint-disable-next-line no-unused-expressions
        cached.length > maxListLength
          ? setRecommendList(cached.slice(0, maxListLength))
          : setRecommendList(cached);
      }
    }, debounceTime);
    return () => {
      clearTimeout(debounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <Wrapper>
      <section>
        <h2>
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h2>
      </section>
      <div className="inputWrapper">
        <form>
          <Input
            placeholder="질환명을 입력해 주세요."
            value={inputValue}
            onChange={handleValue}
            onKeyDown={handleFocus}
          />
          <Button type={buttonType}>검색</Button>
        </form>
      </div>
      <KeywordRecommendWindow>
        {inputValue ? (
          recommendList.map((item, index) => (
            <RecommendUnit
              key={item.id}
              focus={focusIndex === index}
              setInputValue={setInputValue}
            >
              {item.name}
            </RecommendUnit>
          ))
        ) : (
          <StyledRecommendUnit>검색어 없음</StyledRecommendUnit>
        )}
      </KeywordRecommendWindow>
    </Wrapper>
  );
};
