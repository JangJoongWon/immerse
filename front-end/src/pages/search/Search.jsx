import React, { useState } from 'react';
import SearchHistoryButton from '../../components/button/SearchHistoryButton';
import TagSearchButton from '../../components/button/TagSearchButton';

function Search() {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  function search(){
    // 검색버튼을 누르면 searchInput값을 보내고 검색 결과를 받아옴
  }

  // 검색 버튼을 클릭했을 때 호출되는 함수
  const updateSearchInput = (searchQuery) => {
    setSearchInput(searchQuery);
  };

  return (
    <div>
      <label htmlFor="search_input">검색 : </label>
      <input type="text" id="search_input" value={searchInput} onChange={handleChange} />
      <button onClick={search}>search</button>
      <SearchHistoryButton user_id={1} updateSearchInput={updateSearchInput} searchInput={searchInput} />
      <TagSearchButton user_id={1} updateSearchInput={updateSearchInput} searchInput={searchInput} />

    </div>
  );
}

export default Search;
