const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const DiarySchema = new Schema({
  diaryDate: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  emotionId: {
    type: String,
    required: true,
  },
  emotionUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Diary', DiarySchema);
