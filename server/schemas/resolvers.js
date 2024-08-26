const { User, BlogPost } = require("../models");
const resolvers = {
  Query: {
    blogPosts: async () => {
      return BlogPost.find({});
    },
  },
  Mutation: {
    addBlogPost: async (_, { title, content, author }) => {
      if (!title || !content || !author) {
        throw new Error("Must have all fields filled in!");
      }
      try {
        const post = await BlogPost.create({
          title,
          content,
          author,
        });
      } catch (err) {
        throw new Error("Error creating blog post " + err.message);
      }
    },
  },
};
module.exports = resolvers;
