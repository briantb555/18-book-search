import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

app.use(routes);
await server.start();
app.use('/graphql',
  express.json(),
  expressMiddleware(server, {
    context: authenticateToken,
  }),
);

db.once('open', () => {
  console.log('Connected to the database');
});
//start the server
function startServer() {
  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`🚀 Server ready at http://localhost:3001/graphql`);
  });
}
startServer();

