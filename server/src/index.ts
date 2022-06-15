import { graphqlHTTP } from "express-graphql";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { schema } from "./graphql";
import { connectMongo } from "./config";

dotenv.config();
connectMongo();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: process.env.NODE_ENV === "development",
    schema,
  })
);

app.use((req, res, next) => {
  if (req.headers.authorization) {
    req.user.email = req.headers.authorization;
  }
  next();
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
