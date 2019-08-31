export const queries = {
  repository: async (_, { input }, context) => {
    if (input.id) {
      return await CommitModel.findById(input.id);
    } else if (input.hash) {
      return await CommitModel.findOne({ hash: input.hash });
    }
  },
  repositories: async () => await CommitModel.find()
};
