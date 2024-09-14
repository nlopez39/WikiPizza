const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  blogposts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
});
//hash the passwords before saving the document
userSchema.pre("save", async function (next) {
  //if this is a new document or the password has beeen modified then hash the password
  if (this.isNew || this.isModified("password")) {
    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRound);
  }
  //once this middleware is done, move onto the next
  next();
});
//custom method that will check whether the password entered by the user matches that password in the DB
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = model("User", userSchema);
module.exports = User;
