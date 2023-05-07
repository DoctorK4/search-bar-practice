import { getRecommendData } from 'api/getRecommendData';
import {
  Button,
  Input,
  RecommendUnit,
  KeywordRecommendWindow,
  Wrapper,
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
    if (event.key === 'ArrowDown') {
      setFocusIndex(prev => prev + 1);
      // eslint-disable-next-line no-console
      console.log(focusIndex);
    }
    if (event.key === 'ArrowUp') {
      setFocusIndex(prev => prev - 1);
      // eslint-disable-next-line no-console
      console.log(focusIndex);
    }
    if (event.key === 'Enter') {
      setInputValue(event.target.value);
    }
    if (event.key === 'Escape') {
      setFocusIndex(-1);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      const inputValueCache = localStorage.getItem(inputValue);
      if (inputValue && !inputValueCache) {
        const newList = await getRecommendData(inputValue);
        if (newList.length > 0) {
          localStorage.setItem(inputValue, JSON.stringify(newList));
        }
        if (newList.length <= maxListLength) {
          setRecommendList(newList);
        }
        if (newList.length > maxListLength) {
          setRecommendList(newList.slice(0, maxListLength));
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
            <RecommendUnit key={item.id} focus={focusIndex === index}>
              {item.name}
            </RecommendUnit>
          ))
        ) : (
          <RecommendUnit>검색어 없음</RecommendUnit>
        )}
      </KeywordRecommendWindow>
    </Wrapper>
  );
};
