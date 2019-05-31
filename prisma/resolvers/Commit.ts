import { CommitResolvers } from '../generated/graphqlgen';

export const Commit: CommitResolvers.Type = {
  ...CommitResolvers.defaultResolvers,

  author: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  }
};
