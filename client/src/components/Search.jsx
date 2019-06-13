import React from 'react';
import { SearchInput } from 'evergreen-ui';

const Search = ({ handleSearch }) => {
  return <SearchInput onChange={handleSearch} marginRight={16} placeholder="Type to search..." width="100%" />;
};

export default Search;
