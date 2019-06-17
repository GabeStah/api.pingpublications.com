import { WritModel } from './model';

export const queries = {
  writs: async () =>
    await WritModel.find()
      .limit(2)
      .exec()
};
