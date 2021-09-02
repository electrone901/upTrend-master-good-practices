import { gql } from 'apollo-server-express';

export default gql`

  type Post {
    id: Int!
    title: String!
    category: String!
    content: String!
    cover: String
    userId: Int!
    commentsCount: Int
    likes: [Int]
    createdAt: String
    updatedAt: String
  }

  input CreatePostInput {
    title: String!
    category: String!
    content: String!
    cover: String
  }

  input UpdatePostInput {
    postId: Int!
    title: String
    category: String
    content: String
    cover: String
  }

  type Query {
    allPosts: [Post!],
    myPosts(userId: Int!): PostsResponse!
  }

  type Mutation {
    createPost(input: CreatePostInput!) : PostResponseStatus!
    updatePost(input: UpdatePostInput!) : PostResponseStatus!
    deletePost(postId: Int!) : PostResponseStatus!
  }

  type PostResponseStatus {
    ok: Boolean!
    errors: [Error]
  }

  type PostsResponse {
    posts: [Post!]
  }
`;
