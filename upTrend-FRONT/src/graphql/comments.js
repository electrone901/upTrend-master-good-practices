import gql from 'graphql-tag';

export const GET_ALL_COMMENTS_BY_POST = gql`
  query allCommentsByPostId($postId: Int!) {
    allCommentsByPostId(postId: $postId) {
      comments {
        id
        title
        content
        positiveVotes
        negativeVotes
        userId
        postId
        User {
          avatar
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_COMMENTS_COUNT_BY_POST = gql`
  query commentsCountByPostId($postId: Int!) {
    commentsCountByPostId(postId: $postId) {
      count
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation($input: UpdateCommentInput!) {
    updateComment(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
