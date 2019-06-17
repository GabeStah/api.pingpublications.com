import { find, filter } from 'lodash';
import { RepositoryModel } from '../src/models/GitHub/repository';
import { CommitModel } from '../src/models/GitHub/commit';

// example data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }
];

// See: https://github.com/kenzotakahashi/enamel/blob/master/server/src/resolvers.js

export const resolvers = {
  Query: {
    repository: async (_, { id }, context) =>
      await RepositoryModel.findById(id),
    repositories: async () => await RepositoryModel.find({})
  }

  // Mutation: {
  //   // upvotePost: (_, { postId }) => {
  //   //   const post = find(posts, { id: postId });
  //   //   if (!post) {
  //   //     throw new Error(`Couldn't find post with id ${postId}`);
  //   //   }
  //   //   post.votes += 1;
  //   //   return post;
  //   // }
  // }

  // Repository: {
  //   commits: async repository => await CommitModel.find({})
  // },
  //
  // Author: {
  //   posts: author => filter(posts, { authorId: author.id })
  // },
  //
  // Post: {
  //   repository: post => find(authors, { id: post.authorId })
  // }
};
