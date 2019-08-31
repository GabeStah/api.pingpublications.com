import mongoose from 'mongoose';

const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}:${process.env.DB_PORT}/${process.env.DB_NAME}${process.env.DB_QUERY}`;

mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true });

mongoose.connection.once('open', () =>
  console.log(`Connected to MongoDB at ${process.env.DB_HOST}`)
);
