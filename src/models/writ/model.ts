import { Document, Schema, model } from 'mongoose';

export interface WritInterface extends Document {
  config?: string;
  content: string;
  createdAt: Date;
  title?: string;
  updatedAt: Date;
}

const schema = new Schema({
  config: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

export const WritModel = model<WritInterface>('writ', schema, 'writs');
