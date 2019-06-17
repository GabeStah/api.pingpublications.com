import './db';

import { mutations as CommitMutations } from './models/commit';
import { mutations as RepositoryMutations } from './models/repository';

import { queries as CommitQueries } from './models/commit';
import { queries as RepositoryQueries } from './models/repository';
import { queries as WritQueries } from './models/writ';

export default {
  Mutation: {
    ...CommitMutations,
    ...RepositoryMutations
  },
  Query: {
    ...CommitQueries,
    ...RepositoryQueries,
    ...WritQueries
  }
};

// TODO: https://github.com/kenzotakahashi/enamel/blob/master/server/src/resolvers.js

// PAgination: https://codeburst.io/graphql-pagination-by-example-part-2-2803802ef23a

/**
 * Example of using .populate(...) after creating base document
 * to populate referenced objects.
 * See: https://mongoosejs.com/docs/populate.html
 * TODO: Must know valid _id for ObjectId fields, otherwise leave null
 */
// async createTask(_, {folder, parent, name}, context) {
//   const userId = getUserId(context)
//   const task = await Task.create({
//     name,
//     parent,
//     folders: folder ? [folder] : [],
//     creator: userId
//   })
//   return await populateTask(Task.findById(task.id))
// },
// function populateTask(promise) {
//   return promise
//     .populate('folders', 'name')
//     .populate('parent', 'name')
//     .populate('assignees', 'name email firstname lastname avatarColor')
//     .populate('creator', 'name email firstname lastname')
// }
