import gql from 'graphql-tag';

export const GET_ALL_POSTS = gql`
  query {
    allPosts {
      id
      title
      category
      content
      commentsCount
      likes
      cover
      userId
      createdAt
      updatedAt
    }
  }
`;

export const GET_ONE_POST = gql`
  query($postId: Int!) {
    postDetails(postId: $postId) {
      id
      title
      category
      content
      cover
      userId
    }
  }
`;

export const DELETE_POST = gql`
  mutation($postId: Int!) {
    deletePost(postId: $postId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation($input: UpdatePostInput!) {
    updatePost(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
