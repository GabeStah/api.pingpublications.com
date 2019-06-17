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

  type Mutation {
    """
    signupUser(email: String!, name: String): User!
    createDraft(title: String!, content: String, authorEmail: String!): Post!
    deletePost(id: ID!): Post
    publish(id: ID!): Post
    """
    createCommit(input: CommitInput): Commit
    updateCommit(id: ID!, input: CommitInput): Commit

    createRepository(input: RepositoryInput): Repository
    deleteRepository(id: ID!): Repository
    updateRepository(id: ID!, input: RepositoryInput): Repository
  }

  type Query {
    writs: [Writ!]
    """
    feed: [Post!]!
    filterPosts(searchString: String): [Post!]!
    post(id: ID!): Post
    """
    filterCommits(hash: String): [Commit!]!

    commit(input: CommitFindInput!): Commit
    commits: [Commit!]

    repository(input: RepositoryFindInput!): Repository
    repositories: [Repository!]
  }

  type Commit {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    author: String!
    committedDate: DateTime!
    hash: String!
    message: String!
    messageHeadline: String!
    status: CommitStatus!
  }

  #  type Organization {
  #    id: ID!
  #    createdAt: DateTime!
  #    updatedAt: DateTime!
  #    users: [User!]!
  #    handle: String!
  #  }

  """
  Code repository.
  """
  type Repository {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    owner: String!
    service: RepositoryServiceType!
    commits: [Commit!]
  }

  #  type Post {
  #    id: ID
  #    body: String
  #    permalink: String
  #    author: String
  #    title: String
  #    tags: [String]
  #    comments: [Comment]
  #  }

  type User {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    name: String
    handle: String!
  }

  type Writ {
    id: ID
    config: String
    content: String
    createdAt: String
    title: String
    updatedAt: String
  }

  input CommitFindInput {
    id: ID
    hash: String
  }

  input CommitInput {
    author: String!
    committedDate: DateTime!
    hash: String!
    message: String!
    messageHeadline: String!
    status: CommitStatus! = Pending
  }

  input RepositoryFindInput {
    id: ID
    name: String
    owner: String
  }

  input RepositoryInput {
    name: String!
    owner: String!
    service: RepositoryServiceType! = GitHub
    commits: [String!]
  }
`;
