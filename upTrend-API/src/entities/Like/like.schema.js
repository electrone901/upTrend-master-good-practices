import { gql } from 'apollo-server-express';

export default gql`

  type Like {
    id: Int!
    postId: Int!
    userId: Int!
  }

  type Query {
    likesCountByPostId(postId: Int!): PostLikesCountResponse!,
    myLikedPosts: [Post]!
  }

  type Mutation {
    toggleLikeOnPost(postId: Int!) : LikeResponseStatus!
  }

  type LikeResponseStatus {
    ok: Boolean!
    isLiked: Boolean
    errors: [Error]
  }

  type PostLikesCountResponse {
    ok: Boolean
    count: Int
    errors: [Error]
  }
`;
