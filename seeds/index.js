const mongoose = require('../config/db');
const mockData = require('./mockData');
const Diary = require('../models/diary');
const path = require('path');

const initDB = async () => {
  for (let data of mockData) {
    const diary = new Diary({
      ...data,
      emotionUrl: path.join(__dirname, `../static/emotion${data.emotionId}.png`),
    });

    await diary.save();
  }
};

initDB().then(() => {
  mongoose.connection.close();
});
