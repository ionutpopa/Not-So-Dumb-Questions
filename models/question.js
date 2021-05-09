const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({ 
  question: {
    type: String,
    required: [true, "Question content is required"]
  },
  answer: {
    type: String,
  }
});

module.exports = mongoose.model('Question', questionSchema); 