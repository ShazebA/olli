// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
  comment: { type: String, required: true },
  starRating:{type:Number, default:0}
});

module.exports = mongoose.model('Feedback', feedbackSchema), "feedbacks";
