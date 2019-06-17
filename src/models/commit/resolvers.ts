import { CommitModel } from './model';

export const mutations = {
  createCommit: async (_, { input }) => {
    return await CommitModel.findOneAndUpdate(
      // Find existing by hash.
      { hash: input.hash },
      { $set: input },
      { new: true, upsert: true }
    );
  },
  updateCommit: async (_, { id, input }) => {
    return await CommitModel.findOneAndUpdate(
      { _id: id },
      { $set: input },
      { new: true }
    );
  }
};

export const queries = {
  commit: async (_, { input }, context) => {
    if (input.id) {
      return await CommitModel.findById(input.id);
    } else if (input.hash) {
      return await CommitModel.findOne({ hash: input.hash });
    }
  },
  commits: async () => await CommitModel.find()
};
