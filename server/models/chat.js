const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MessageSchema = new schema({
  chatusers: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
},{timestamps: true});

const message = mongoose.model("Message", MessageSchema);
module.exports = message;
