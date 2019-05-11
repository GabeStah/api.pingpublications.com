import { gql } from 'apollo-server';

export default gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Comment {
    body: String
    email: String
    author: String
  }

  type Company {
    id: ID
    created_at: String
    updated_at: String
    name: String
    email_address: String
    overview: String
  }

  type Post {
    id: ID
    body: String
    permalink: String
    author: String
    title: String
    tags: [String]
    comments: [Comment]
  }

  type Writ {
    id: ID
    config: String
    content: String
    createdAt: String
    title: String
    updatedAt: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    companies: [Company]
    posts: [Post]
    writs: [Writ]
  }
`;
