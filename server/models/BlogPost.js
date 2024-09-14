const { Schema, model } = require("mongoose");
const blogpostschema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
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
