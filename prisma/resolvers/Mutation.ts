import { MutationResolvers } from '../generated/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  deleteRepository: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  }
};
