const { User, BlogPost } = require("../models");
//import signToken and AuthenticationError functions from the auth.js

const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    blogPosts: async () => {
      return BlogPost.find().populate("author");
    },
    users: async () => {
      return User.find().populate("blogposts");
    },
    singleuser: async (parent, { email }) => {
      return User.findOne({ email }).populate("blogposts");
    },
  },
  Mutation: {
    //-------------------- BlogPost Mutations---------------------------
    addBlogPost: async (parent, { title, content }, context) => {
      // console.log("Context", context.req.body.variables.authorId);
      console.log("Context 2", context);
      if (!title || !content) {
        throw new Error("Must have all fields filled in!");
      }
      try {
        if (!context.userId) {
          throw new Error("Author not found");
        }
        const newBlogPost = await BlogPost.create({
          title,
          content,
          authorId: context.userId,
        });
        // Add the blog post to the user's blogposts array
        await User.findByIdAndUpdate(authorId, {
          $push: { blogposts: newBlogPost._id },
        });
        //populate the author field for the blogpost; was receiving error in GrpahQL that author parameters were not defined when I created a blog post
        const populateBlogPost = await BlogPost.findById(
          newBlogPost._id
        ).populate("author");
        return populateBlogPost;
      } catch (err) {
        console.log("Signup", err);
        throw new Error("Error creating blog post " + err.message);
      }
    },
    //update a blog post title or content
    updateBlogPost: async (_, { _id, title, content }) => {
      try {
        await BlogPost.findOneAndUpdate(
          { _id },
          { title, content },
          //grab the updated file
          { new: true }
        );
      } catch (err) {
        console.log(err);
      }
    },
    //delete Blog Post
    deleteBlogPost: async (_, { _id }) => {
      try {
        await BlogPost.findOneAndDelete({ _id }, { new: true });
      } catch (err) {
        console.log(err);
      }
    },
    //------------------ User Mutations ---------------------------------------
    signup: async (_, { firstname, lastname, email, password }) => {
      try {
        //create a user
        const user = await User.create({
          firstname,
          lastname,
          email,
          password,
        });
        console.log("newly created user ", user);
        //create a token for that user
        const token = signToken(user);
        console.log("token ", token);

        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      //else user exists so check that they have the correct password
      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      console.log("This is the user data : ", user);

      return { token, user };
    },
  },
};
module.exports = resolvers;
