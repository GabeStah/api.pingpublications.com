import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './schemas';

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(({ url }) => console.log(`Server ready at ${url}. `));

const DB_PATH = `mongodb+srv://${process.env.DB_USER}:${
  process.env.DB_PASSWORD
}@${process.env.DB_HOST}${process.env.DB_PATH}${process.env.DB_QUERY}`;

// if (module.hot) {
//   module.hot.accept();
//   module.hot.dispose(() => server.stop());
// }
