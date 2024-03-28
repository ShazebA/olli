const mongoose = require('mongoose');

const waiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  signedList: [
    {
      parentName: {
        type: String,
        required: true,
      },
      parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      dependents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  ],
});

const Waiver = mongoose.model('Waiver', waiverSchema, 'waivers');
module.exports = Waiver;