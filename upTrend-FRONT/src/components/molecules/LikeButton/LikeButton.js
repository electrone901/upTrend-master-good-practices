import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { useStoreState } from 'easy-peasy';

import { Button, Badge } from '@material-ui/core';
import LikeIcon from '@material-ui/icons/ThumbUp';

import { TOGGLE_LIKE_ON_POST } from 'graphql/likes';
import { useLikeButtonStyles } from './likeButton.styles';
import { GET_ALL_POSTS } from 'graphql/posts';

const LikeButton = ({ likes, count, postId }) => {
  const classes = useLikeButtonStyles();
  const currentUserId = useStoreState(state => state.user.user.id);
  const isLiked = likes.length > 0 && likes.includes(currentUserId);
  const toggleLikeOnPost = useMutation(TOGGLE_LIKE_ON_POST, {
    variables: { postId },
    update: (proxy, { data: { toggleLikeOnPost } }) => {
      const data = proxy.readQuery({ query: GET_ALL_POSTS });
      try {
        if (toggleLikeOnPost.ok && toggleLikeOnPost.isLiked) {
          const allPosts = data.allPosts.map(
            post => post.id !== postId
              ? post
              : {
                ...post,
                likes: [...post.likes, currentUserId]
              });
          return proxy.writeQuery({ query: GET_ALL_POSTS, data: { allPosts } });
        }
        if (toggleLikeOnPost.ok && !toggleLikeOnPost.isLiked) {
          const allPosts = data.allPosts.map(post => post.id !== postId
            ? post
            : {
              ...post,
              likes: post.likes.filter(likedByUser => likedByUser !== currentUserId)
            });
          return proxy.writeQuery({ query: GET_ALL_POSTS, data: { allPosts } });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <Button
      size='small'
      color='primary'
      onClick={toggleLikeOnPost}
    >
      <Badge classes={{ badge: classes.badge }} color='secondary' badgeContent={count} >
        <LikeIcon style={{
          color: isLiked ? '#3CD4A0' : '#1A1E27'
        }} />
      </Badge>
    </Button>
  );
};

export default LikeButton;
