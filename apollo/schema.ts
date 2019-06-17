import { gql } from 'apollo-server';

export default gql`
  scalar DateTime

  enum CommitStatus {
    Pending
    Processed
  }

  enum RepositoryServiceType {
    GitHub
    GitLab
    Bitbucket
  }

  type Query {
    """
    feed: [Post!]!
    filterPosts(searchString: String): [Post!]!
    post(id: ID!): Post
    """
    filterCommits(hash: String): [Commit!]!
    commit(id: ID!): Commit
    organization(id: ID!): Organization
    repository(id: ID!): Repository
    repositories: [Repository]
  }

  type Mutation {
    """
    signupUser(email: String!, name: String): User!
    createDraft(title: String!, content: String, authorEmail: String!): Post!
    deletePost(id: ID!): Post
    publish(id: ID!): Post
    """
    deleteRepository(id: ID!): Repository
  }

  type Commit {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    author: [User!]!
    committedDate: DateTime!
    hash: String!
    message: String!
    messageHeadline: String!
    status: CommitStatus!
  }

  type Organization {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    users: [User!]!
    handle: String!
  }

  type Repository {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    owner: User!
    service: RepositoryServiceType!
    commits: [Commit!]!
  }

  type User {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    name: String
    handle: String!
  }
`;
