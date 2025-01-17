import { config } from 'dotenv';
config();
import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './schemas';

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(({ url }) => console.log(`Server ready at ${url}. `));

// if (module.hot) {
//   module.hot.accept();
//   module.hot.dispose(() => server.stop());
// }
