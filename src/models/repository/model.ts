import mongoose, { Document, model, Schema } from 'mongoose';

import { ICommitModel } from '../commit';
import { RepositoryServiceType } from './enum';

const { ObjectId } = Schema.Types;

// See: https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/

export interface IRepositoryModel extends Document {
  commits: [ICommitModel];
  name: string;
  owner: string;
  service: RepositoryServiceType;
}

export const RepositorySchemaType = new Schema(
  {
    commits: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Commit', required: false }
    ],
    name: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    service: {
      default: RepositoryServiceType.GitHub,
      type: RepositoryServiceType,
      required: true
    }
  },
  { timestamps: true }
);

export const RepositoryModel = model<IRepositoryModel>(
  'Repository',
  RepositorySchemaType,
  'Repositories'
);
