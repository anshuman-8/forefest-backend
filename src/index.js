import express from "express";
import mongoose from "mongoose";
import { DB, mode } from "./config/index.js";
import { ApolloServer } from "apollo-server-express";
import consola from "consola";
import AuthMiddleware from "./middlewares/auth.js";
import * as AppModels from "./models/index.js";
import { resolvers, typeDefs } from "./graphql/index.js";
const { success, error } = consola;

const startServer = async () => {
  const PORT = process.env.PORT || 4000;
  try {
    const app = express();
    app.use(AuthMiddleware);
    
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      persistedQueries: false,
      // schemaDirectives,
      playground: mode,
      context: ({ req }) => {
        let { isAuth, user } = req;
        return { req, isAuth, user, ...AppModels };
      },
    });
    
    await mongoose.connect((DB || process.env.DB_URL), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverApi: ServerApiVersion.v1
    }, (err) => {
      if (err) {
        error(err);
      } else {
        success({
              message: "Mongoose connected",
              badge: true,
            });
      }
    });


    await apolloServer.start();

    await apolloServer.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      success({
        message: `Server started at port ${PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    error(err);
  }
};

startServer();
