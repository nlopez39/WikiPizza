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
    addBlogPost: async (_, { title, content, authorId }) => {
      if (!title || !content || !authorId) {
        throw new Error("Must have all fields filled in!");
      }
      try {
        //check if the author exists
        const author = await User.findById(authorId);
        if (!author) {
          throw new Error("Author not found");
        }
        const newBlogPost = await BlogPost.create({
          title,
          content,
          author: authorId,
        });
        return newBlogPost;
      } catch (err) {
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
        //create a token for that user
        const token = signToken(user);

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

      return { token, user };
    },
  },
};
module.exports = resolvers;
