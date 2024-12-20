// const context = (ctx) => ctx;
// const context = ;
//initialize express
const express = require("express");

//require cors
const cors = require("cors");
//iniitalize Apollo Client server for GraphQL
const { ApolloServer } = require("@apollo/server");
//initialize Middleware that connects Apollo Server with Express, allowing GraphQL requests to be handled by the Express server.
const { expressMiddleware } = require("@apollo/server/express4");
//call the resolvers and typdefs from their folders:
const { typeDefs, resolvers } = require("./schemas");
//connect mongoDB database
const db = require("./config/connection");
const { getUserId } = require("./utils/auth");

//context function
const context = ({ req }) => {
  console.log("Request Header", req.headers);
  const token = req.headers.authorization || "";
  console.log("token from header : ", token);
  if (!token) {
    console.log("Authentication token missing");
  }
  // console.log(getUserId(token));

  try {
    console.log("This is working ");
    const userId = getUserId(token);
    console.log("userId", userId);
    return { userId };
  } catch (err) {
    console.log("invalid or expired token", err);
  }
};

//his initializes an Express application, which serves as the main web server.
const app = express();

//these typedefs and resolvers will be moved into their own files under the schema folder

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 3001;

//start the server
//These initializations are placed inside the startServer function to ensure that the Apollo Server is fully ready before handling any requests. It allows for proper sequencing of operations, like starting the server, applying middleware, and handling GraphQL requests—all of which rely on the server being configured correctly.
const startServer = async () => {
  //operation that prepares the Apollo Server to handle incoming GraphQL requests
  //The await keyword ensures that the server is completely ready before any requests are processed.
  await server.start();
  // Enable CORS for requests from your frontend (http://localhost:3000)
  // Express.js example for CORS setup

  app.use(
    cors({
      origin: "http://localhost:3000", // Allow frontend requests
      credentials: true, // If you're sending cookies or authentication headers
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  //init express middleware that will read json data that is sent from the client to the server
  app.use(express.json());
  //tells the server to handle requests sent to the /graphql endpoint. When a client sends a GraphQL query or mutation

  app.use("/graphql", expressMiddleware(server, { context }));

  //db
  db.once("open", () => {
    console.log("MongoDB database connected successfully!");
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });

  app.get("/", (req, res) => {
    res.send("Welcome the Pizza Blog");
  });
  //   app.listen(PORT, () => {
  //     console.log(`Example app listening on port ${PORT}`);
  //   });
};

startServer();
