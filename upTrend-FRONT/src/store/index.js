import { createStore } from 'easy-peasy';
import { user } from './entities/user';
import { posts } from './entities/posts';

export const store = createStore({
  user,
  posts
});
