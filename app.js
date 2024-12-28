const express = require('express');
const path = require('path');
const mongoose = require('./config/db');
const Diary = require('./models/diary');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/diaries', async (req, res) => {
  const diaries = await Diary.find({});
  res.send(diaries);
});

app.get('/diaries/:id', async (req, res) => {
  const { id } = req.params;
  const diary = await Diary.findById(id);
  res.send(diary);
});

app.post('/diaries', async (req, res) => {
  const diary = new Diary({
    ...req.body,
    emotionUrl: path.join(__dirname, `./static/emotion${req.body.emotionId}.png`),
  });
  await diary.save();
  // 저장한 다음 DB에 생성된 Diary 결과 내려보내주기
  res.send(await Diary.find({ _id: diary._id }));
});

app.put('/diaries/:id/edit', async (req, res) => {
  const { id } = req.params;
  const diary = await Diary.findByIdAndUpdate(
    id,
    {
      ...req.body,
      emotionUrl: path.join(__dirname, `./static/emotion${req.body.emotionId}.png`),
    },
    { new: true }
  );
  res.send(diary);
});

app.listen(3000, () => {
  console.log('Server Start!');
});
