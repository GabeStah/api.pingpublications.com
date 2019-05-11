import { model, Schema } from 'mongoose';

const commentSchema = new Schema({
  body: String,
  email: String,
  author: String
});

const postSchema = new Schema({
  body: String,
  permalink: String,
  author: String,
  title: String,
  tags: [String],
  comments: [commentSchema]
});

export const Post = model('post', postSchema);
