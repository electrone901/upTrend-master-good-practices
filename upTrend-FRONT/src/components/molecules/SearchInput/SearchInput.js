import React from 'react';

import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useSearchInputStyles } from './searchInput.styles';
import { useStoreState, useStoreActions } from 'easy-peasy';

const SearchInput = () => {
  const classes = useSearchInputStyles();
  const searchQuery = useStoreState(state => state.posts.searchQuery);
  const setSearchQuery = useStoreActions(state => state.posts.setSearchQuery);

  const handleChange = e => setSearchQuery(e.target.value);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder='Search posts…'
        onChange={handleChange}
        value={searchQuery}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default SearchInput;
