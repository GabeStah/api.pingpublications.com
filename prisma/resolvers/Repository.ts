import { RepositoryResolvers } from '../generated/graphqlgen';

export const Repository: RepositoryResolvers.Type = {
  ...RepositoryResolvers.defaultResolvers,

  owner: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  commits: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  }
};
