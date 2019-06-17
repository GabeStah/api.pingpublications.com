import { Document, Schema, model } from 'mongoose';

import { CommitStatus } from './enum';

export interface ICommitModel extends Document {
  author: string;
  committedDate: Date;
  createdAt: Date;
  hash: string;
  message: string;
  messageHeadline: string;
  status: CommitStatus;
  updatedAt: Date;
}

export const CommitSchemaType = new Schema(
  {
    author: {
      type: String,
      required: true
    },
    committedDate: {
      type: Date,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    hash: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    messageHeadline: {
      type: String,
      required: true
    },
    status: {
      type: CommitStatus,
      required: true,
      default: CommitStatus.Pending
    },
    updatedAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export const CommitModel = model<ICommitModel>(
  'Commit',
  CommitSchemaType,
  'Commits'
);
