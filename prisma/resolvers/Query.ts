import { QueryResolvers } from '../generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  filterCommits: (parent, { hash }, ctx) => {
    return ctx.prisma.commits({
      where: {
        hash: hash
      }
    });
  },
  commit: (parent, { id }, ctx) => {
    return ctx.prisma.commit({
      id
    });
  },
  organization: (parent, { id }, ctx) => {
    return ctx.prisma.organization({
      id
    });
  },
  repository: (parent, { id }, ctx) => {
    return ctx.prisma.repository({
      id
    });
  }
};
