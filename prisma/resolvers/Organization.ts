import { OrganizationResolvers } from '../generated/graphqlgen';

export const Organization: OrganizationResolvers.Type = {
  ...OrganizationResolvers.defaultResolvers,

  users: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  }
};
