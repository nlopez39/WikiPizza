const { Schema, model } = require("mongoose");
const blogpostschema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const BlogPost = model("BlogPost", blogpostschema);
module.exports = BlogPost;
