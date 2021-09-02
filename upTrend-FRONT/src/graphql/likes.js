import gql from 'graphql-tag';

export const GET_LIKES_COUNT_BY_POST = gql`
  query likesCountByPostId($postId: Int!) {
    likesCountByPostId(postId: $postId) {
      count
    }
  }
`;

export const GET_LIKED_POSTS = gql`
  query myLikedPosts {
    myLikedPosts {
      id
      title
      category
      content
      commentsCount
      likes
      cover
      userId
    }
  }
`;

export const TOGGLE_LIKE_ON_POST = gql`
  mutation toggleLikeOnPost($postId: Int!) {
    toggleLikeOnPost(postId: $postId) {
      ok
      isLiked
    }
  }
`;
