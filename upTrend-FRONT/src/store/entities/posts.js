import { action } from 'easy-peasy';

export const posts = {
  selectedCategory: '',
  searchQuery: '',
  setCategoryToBrowse: action((state, category) => {
    state.selectedCategory = category;
    return state;
  }),
  setSearchQuery: action((state, searchQuery) => {
    state.searchQuery = searchQuery.toLowerCase();
    return state;
  })
};
