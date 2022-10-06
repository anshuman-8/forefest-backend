import express from "express";
import mongoose from "mongoose";
import { DB, mode } from "./config";
import { ApolloServer } from "apollo-server-express";
import { success, error } from "consola";
import AuthMiddleware from "./middlewares/auth";
import * as AppModels from "./models";
import { resolvers, typeDefs } from "./graphql";

const startServer = async () => {
  try {
    const app = express();
    app.use(AuthMiddleware);
    
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      // schemaDirectives,
      playground: mode,
      context: ({ req }) => {
        let { isAuth, user } = req;
        return { req, isAuth, user, ...AppModels };
      },
    });

    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // success(`Connected to MongoDB at: ${DB}`);

    await apolloServer.start();

    await apolloServer.applyMiddleware({ app });

    app.listen({ port: (process.env.PORT || 4000) }, () =>
      success({
        message: `Server started  `,// http://localhost:${PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    error(err);
  }
};

startServer();
