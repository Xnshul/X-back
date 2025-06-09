<<<<<<< HEAD
import express, { query } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json({}))
  const graphqlServer = new ApolloServer({
     typeDefs: `type Query { sayHello: String }`,
     resolvers:{
          Query:{
               sayHello:() => `Hello From graph Sql Server`
          }
     }

  });

 await graphqlServer.start();
 app.use("/graphql", expressMiddleware(graphqlServer));
 return app;
}
=======
import express = require("express");
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import * as bodyParser from "body-parser";
import { printSchema } from "graphql";

export async function initServer(){
  const app = express();
  app.use(bodyParser.json())
}
>>>>>>> d432332 (googleauth)
