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
  date: {
    type: Date,
    default: Date.now,
  },
});
const BlogPost = model("BlogPost", blogpostschema);
module.exports = BlogPost;
