import { RepositoryModel } from './model';

export const mutations = {
  createRepository: async (_, { input }) => {
    return await RepositoryModel.findOneAndUpdate(
      // Find existing repo by name + owner.
      { name: input.name, owner: input.owner },
      { $set: input },
      { new: true, upsert: true }
    ).populate('commits');
  },
  updateRepository: async (_, { id, input }, context) => {
    return await RepositoryModel.findOneAndUpdate(
      { _id: id },
      { $set: input },
      { new: true }
    ).populate('commits');
  }
};

export const queries = {
  repository: async (_, { input }, context) => {
    if (input.id) {
      return await RepositoryModel.findById(input.id).populate('commits');
    } else if (input.name && input.owner) {
      return await RepositoryModel.findOne({
        name: input.name,
        owner: input.owner
      }).populate('commits');
    }
  },
  repositories: async () => await RepositoryModel.find().populate('commits')
};
