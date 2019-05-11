require('./db');
// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
import { CompanySchema } from './models/company';
import { Post } from './models/post';
import { Writ } from './models/writ';

const books = [
  {
    title: 'Assdasdd Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

// TODO: https://github.com/kenzotakahashi/enamel/blob/master/server/src/resolvers.js

// PAgination: https://codeburst.io/graphql-pagination-by-example-part-2-2803802ef23a

export default {
  Query: {
    books: () => books,
    companies: async () =>
      CompanySchema.find()
        .limit(5)
        .exec(),
    posts: async () =>
      await Post.find()
        .limit(2)
        .exec(),
    writs: async () =>
      await Writ.find()
        .limit(2)
        .exec()
  }
};
