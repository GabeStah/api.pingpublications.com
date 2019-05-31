import { Resolvers } from '../generated/graphqlgen';
import { Query } from './Query';
import { Commit } from './Commit';
import { User } from './User';
import { Organization } from './Organization';
import { Repository } from './Repository';
import { Mutation } from './Mutation';

export const resolvers: Resolvers = {
  Query,
  Commit,
  User,
  Organization,
  Repository,
  Mutation
};
