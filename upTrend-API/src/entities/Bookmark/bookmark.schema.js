import { gql } from 'apollo-server-express';

export default gql`

  type Bookmark {
    id: Int!
    postId: Int!
    userId: Int!
  }

  input BookmarkInput {
    postId: Int!
    userId: Int!
  }

  type Query {
    myBookmarks(userId: Int!): BookmarksResponse!
  }

  type Mutation {
    createBookmark(input: BookmarkInput!) : BookmarkResponseStatus!
    deleteBookmark(bookmarkId: Int!): BookmarkResponseStatus!
  }

  type BookmarkResponseStatus {
    ok: Boolean!
    errors: [Error]
  }

  type BookmarksResponse {
    posts: [Post]!
  }
`;
