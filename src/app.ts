import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { authChecker } from './security/authorization-checker';
import { verifyToken } from './security/jwt';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';

export async function startServer() {
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ 
                UserResolver,
                PostResolver
            ],
            authChecker
        }),
        context: ({ req }) => {
            const { authorization } = req.headers;
            const payload = verifyToken(authorization);
            return {
                user: payload
            }
        }
    });
    
    apolloServer.applyMiddleware({ app, path: '/graphql' });

    return app;
}



