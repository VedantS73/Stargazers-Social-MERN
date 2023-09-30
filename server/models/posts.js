const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PostSchema = new schema({
  headline: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: String,
  username: {
    type: String,
    required: true,
  },
  postTime: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: "s",
  },
});

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
