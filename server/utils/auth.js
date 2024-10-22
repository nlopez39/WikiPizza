require("dotenv").config();
//class used to create custom errors
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const { GraphQLError } = require("graphql");
//package that allows us to sign and verify JWTs
const jwt = require("jsonwebtoken");
//call the secret and expiration from the .env file
//secret string used to sign and verify tokens
const secret = process.env.JWT_SECRET;
//defines how long the token is valid
const expiration = process.env.JWT_EXPIRATION;

//exported functions
module.exports = {
  //a custom GraphQL error for unauthenticated users; Handles errors related to failed authentication attempts;this error is returned to the client, informing them that their authentication attempt was unsuccessful.
  AuthenticationError: new GraphQLError("Could not authenticate user", {
    //extension code can be used to identify the error type
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  //this functions checks for the JWT in the req body; either header, query or body
  //This middleware function checks incoming requests to see if they have a valid token and verifies it. If the token is valid, it adds the user’s information to the req object so that the server knows who is making the request.
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    //if the token is in the header than split and  trim the header down to just get the -> Bearer< token> syntax
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    //if there isn't a token then return the request
    if (!token) {
      return req;
    }

    //if a token was found then try to verify it
    try {
      //verifies the the token is valid using the secret and expiration
      //jwt.verify returns the decoded token
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      //if token is vaild then the decoded data is attached  req.user
      req.user = data;
      //example of req.user will look like
      // {  email : "test@email.com"
      //      _id: 123
      //      }
    } catch {
      //if token is invalid or expired then output an error
      console.log("Invalid Token");
    }

    return req;
  },
  //Creates and signs a JWT token that will be sent to the client after they authenticate (login/signup).
  //used to sign a JWT token with  the provided user information : email, _id from user
  signToken: function ({ email, _id }) {
    //payload will consist of email and id
    const payload = { email, _id };
    //creates the token with the payload, secret and expiration
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
