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
    const { headline, content, username, imageUrl } = req.body;

    let type = "s";
    if (imageUrl === ""){
      type = "s";
    }
    else {
      type = "l";
    }
    console.log(`username is : ${username}`);

    const newPost = new Post({
      headline,
      content,
      imageUrl,
      username,
      type,
    });

    console.log(newPost);

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
