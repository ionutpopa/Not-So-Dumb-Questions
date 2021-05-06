const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({ 
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  content: {
    type: String,
    required: [true, "Content can't be blank"]
  },
  response: {
    type: String,
  }
});

module.exports = mongoose.model('Question', questionSchema); 