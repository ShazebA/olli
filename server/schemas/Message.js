// schemas/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
//   recipientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Users',
//     required: false,
//   },
  group: {
    type: String,
    required: true,
    enum: ['dependents', 'parents', 'announcements'],
  },

});

const Message = mongoose.model('Message', messageSchema,  "Messages");

module.exports = Message;
