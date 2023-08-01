import { useState } from 'react';
import TagSearchButton from '../../components/button/TagSearchButton';
import SearchHistoryButton from '../../components/button/SearchHistoryButton';
import SearchList from '../../components/searchlist/SearchList'
// import { Button } from 'react-bootstrap';

function Search() {
  const [searchInput, setSearchInput] = useState(''); // 검색어 상태를 관리하는 state
  const [searchFilters, setSearchFilters] = useState([]); // 검색 필터 상태를 관리하는 state

  // 검색어 입력이 변경될 때 호출되는 함수
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  // 검색 버튼을 클릭했을 때 호출되는 함수
  const search = () => {
    // 여기에서 실제 검색 기능을 구현합니다.
    // 검색 기능은 원하는 방식으로 서버 요청 또는 클라이언트 측에서 결과를 처리하는 방식으로 구현 가능합니다.
    // 예를 들어, 검색어와 함께 API 호출을 수행하거나, 클라이언트 측에서 검색 기능을 구현할 수 있습니다.
    console.log('검색어:', searchInput);
    console.log('검색 필터:', searchFilters);
    // 검색 결과를 받아오는 코드를 작성하세요.
  };

  // 검색어를 업데이트하는 함수
  const updateSearchInput = (newSearchInput) => {
    setSearchInput(newSearchInput);
  };

  // 검색 필터를 업데이트하는 함수
  const updateSearchFilters = (tag) => {
    if (!searchFilters.includes(tag)) {
      setSearchFilters([...searchFilters, tag]); // 새로운 태그를 검색 필터에 추가
    }
  };

  return (
    <div>
      <label htmlFor="search_input">검색 : </label>
      <input type="text" id="search_input" value={searchInput} onChange={handleChange} />
      <button onClick={search}>search</button>
      {/* 검색 필터를 화면에 표시 */}
      {/* {searchFilters.map((filter) => (
        <Button key={filter}>
          {filter}
        </Button>
      ))} */}
      <SearchHistoryButton user_id={1} updateSearchInput={updateSearchInput} searchInput={searchInput} />
      <TagSearchButton user_id={1} updateSearchFilters={updateSearchFilters} searchInput={searchInput} />
      <div>
        <SearchList/>
      </div>
    </div>
  );
}

export default Search;
