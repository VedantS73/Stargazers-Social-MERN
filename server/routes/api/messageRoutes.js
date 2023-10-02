const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const Message = require("../../models/chat");
const authenticateToken = require("../../middlewares/authenticateToken");

router.get("/getchat/:user1id/:user2id" , async (req, res) => {
    const from = req.params.user1id;
    const to = req.params.user2id;
    try {
        const messages = await Message.find({
          $or: [
            { chatusers: [from, to] },
            { chatusers: [to, from] },
          ],
            // chatusers: { $all: [from, to] },
        }).sort({ updatedAt:1 });

        const allmessages = messages.map((msg) => {
            return {
                myself: msg.sender.toString() === from,
                message : msg.message,
            };
        });

        return res.status(200).json(allmessages);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.post("/createmessage" ,async (req, res) => {
  try {
    const {from, to, message} = req.body;

    const newMessage = new Message({
      chatusers: [from, to],
      message: message,
      sender: from,
    });

    console.log(newMessage);

    const savedMessage = await newMessage.save();

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error"});
    console.log(error);
  }
});

module.exports = router;