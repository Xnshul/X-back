import express = require("express");
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express4';
import bodyParser from "body-parser";
import { printSchema } from "graphql";
import { PrismaClient } from "@prisma/client";
import { graphqlServer } from './path/to/graphqlServer';

export async function initServer(){
  const app = express();
  app.use(bodyParser.json());
  const graphqlServer = new ApolloServer({
    typeDefs:`type Query{
    sayHello: String
    sayHelloToMe(name: String!):String}`,
    resolvers: {
      Query: {
        sayHello: () => `Hello From Graphql Server`,
        sayHelloToMe: (parent: any,{name}: {name:string}) => null,
      },
    },
  });
  await graphqlServer.start();
 app.use("/graphql", expressMiddleware(graphqlServer));



  return app;
}
