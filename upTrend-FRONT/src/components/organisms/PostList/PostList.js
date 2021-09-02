import React from 'react';
import { useStoreState } from 'easy-peasy';

import PostItem from '../PostItem/PostItem';
import { isValidSearchQuery } from 'utils/helpers';

const PostList = ({ posts, showOnlyLiked }) => {
  const currentUserId = useStoreState(state => state.user.user.id);
  const selectedCategory = useStoreState(state => state.posts.selectedCategory);
  const searchQuery = useStoreState(state => state.posts.searchQuery);

  const filterPosts = (postsToFilter) => {
    let filteredPosts = postsToFilter.filter(post =>
      selectedCategory ? post.category === selectedCategory : post
    );

    if (showOnlyLiked) {
      filteredPosts = filteredPosts.filter(post => post.likes.includes(currentUserId));
    }

    if (isValidSearchQuery(searchQuery)) {
      filteredPosts = filteredPosts.filter(
        post =>
          post.title.toLowerCase().includes(searchQuery) ||
            post.content.toLowerCase().includes(searchQuery)
      );
    }

    return filteredPosts;
  };

  const filteredPosts = filterPosts(posts);
  return filteredPosts.map(({ __typename, ...postProps }) => (
    <PostItem key={postProps.id} {...postProps} />
  ));
};

export default PostList;
