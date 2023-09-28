const express = require("express");
const router = express.Router();
const Post = require("../../models/posts");
const User = require("../../models/users");

router.get("/getposts", async (req, res) => {
  try {
    const recentPosts = await Post.find()
      .sort({ postTime: -1 })
      .limit(10);

    res.json(recentPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/createpost", async (req, res) => {
  try {
    const { headline, content, imageUrl, username } = req.body;

    const newPost = new Post({
      headline,
      content,
      imageUrl,
      username,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
