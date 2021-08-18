import React from 'react'
import * as S from './styled';

export default function SearchForm({ handleSearchValue, handleSearch, location }) {
  
  return (
    <S.Form onSubmit={handleSearch}>
      <input
        name="query"
        type="text"
        placeholder="Search parking places"
        value={location}
        onChange={handleSearchValue}
      />
      <S.Button
        type="submit"
      >
        Search
      </S.Button>
    </S.Form>
  );
}