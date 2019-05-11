import mongoose from 'mongoose';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}/${process.env.DB_DATABASE}${process.env.DB_QUERY}`;

mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection.once('open', () =>
  console.log(`Connected to MongoDB at ${url}`)
);
