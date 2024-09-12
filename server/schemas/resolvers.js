const { User, BlogPost } = require("../models");
const resolvers = {
  Query: {
    blogPosts: async () => {
      return BlogPost.find({});
    },
    users: async () => {
      return User.find({});
    },
  },
  Mutation: {
    //-------------------- BlogPost Mutations---------------------------
    addBlogPost: async (_, { title, content, author }) => {
      if (!title || !content || !author) {
        throw new Error("Must have all fields filled in!");
      }
      try {
        await BlogPost.create({
          title,
          content,
          author,
        });
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
        // const token =
      } catch (err) {
        console.log(err);
      }
    },
  },
};
module.exports = resolvers;
