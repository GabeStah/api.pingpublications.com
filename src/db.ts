import mongoose from 'mongoose';

// const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
//   process.env.DB_HOST
// }/${process.env.DB_DATABASE}${process.env.DB_QUERY}`;

// const url = `mongodb://root:example@localhost:27017/api-ping-pub-dev`;

// const url = `mongodb://newuser:newpassword@localhost:27017/testdb`;

const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}:${process.env.DB_PORT}/${process.env.DB_NAME}${process.env.DB_QUERY}`;

console.log(url);

mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true });

mongoose.connection.once('open', () =>
  console.log(`Connected to MongoDB at ${url}`)
);
