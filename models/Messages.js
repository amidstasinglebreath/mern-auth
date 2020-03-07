const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: String,
  name: String,
  gif: String,
}, {
  timestamps: true,
});

// module.exports = mongoose.model('Messages', messageSchema);

const Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages;
