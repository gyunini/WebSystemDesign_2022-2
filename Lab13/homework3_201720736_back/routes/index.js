var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/homework3_201720736', (error => {
    if (error) {
      console.log('DB 연결 오류');
    } else {
      console.log('DB is connected');
    }
  }));
}
connectDB();

mongoose.connection.on('error', (error) => {
  res.status(500).send('DB 연결 오류', error);
})

const sergeInfo = new mongoose.Schema({
  bookName: {
    type: String,
  },
  author: {
    type: String,
  },
  sergeId: {
    type: Number,
    unique: true,
    required: true,
  },
  publishDay: {
    type: Number,
  },
  summary: {
    type: String,
  },
})

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* GET home page. */
router.post('/post', async function(req, res, next) {
  const body = req.body;
  console.log(body);
  const model = mongoose.model("sergeInfo", sergeInfo);
  // const result = await model.find({studentId: body.studentId});
  // if (body.studentId.length === 0){
  //   res.status(401).send('학번이 입력되지 않았습니다.');
  // } else if(result.length !== 0) {
  //   res.status(400).send('이미 저장된 정보입니다.');
  // } else {
    try {
      let data = await model.create({bookName: body.bookName, author: body.author, sergeId: rand(1000,9999), publishDay: body.publishDay, summary: body.summary});
      await data.save();
      console.log(data);
      res.status(200).send(data);
      mongoose.connection.on('error', (error) => {
        res.status(500).send('DB 연결 오류', error);
      })
    } catch(e) {
      res.status(500).send('DB 저장 에러');
    }
  // }
});

router.get("/get", async function(req, res, next) {
  const model = mongoose.model("sergeInfo", sergeInfo);
  const id = req.query.data;
  try {
    const result = await model.find();
    if(result.length === 0) {
      res.status(400).send('No book');
      return;
    }
    res.status(200).send(result);
    mongoose.connection.on('error', (error) => {
      res.status(500).send('DB 연결 오류', error);
    })
  } catch(e) {
    res.status(400).send('필요한 정보가 없음');
  }
})
router.get("/get/info", async function(req, res, next) {
  const model = mongoose.model("sergeInfo", sergeInfo);
  const id = req.query.data;
  try {
    const result = await model.find({sergeId: id});
    if(result.length === 0) {
      res.status(400).send('No book');
      return;
    }
    res.status(200).send(result);
    mongoose.connection.on('error', (error) => {
      res.status(500).send('DB 연결 오류', error);
    })
  } catch(e) {
    res.status(400).send('필요한 정보가 없음');
  }
})

router.delete('/delete', async function(req, res, next) {
  const model = mongoose.model("sergeInfo", sergeInfo);
  const id = req.query.data;
  console.log(id);
  let data = await model.find({sergeId: id});
  try {
    if(data) {
      await model.deleteOne({sergeId: id})
      res.status(200).send(id);
    } else {
      res.status(400).send('데이터가 존재하지 않습니다.');
    }
    mongoose.connection.on('error', (error) => {
      res.status(500).send('DB 연결 오류', error);
    })
  } catch(e) {
    res.status(500).send('오류 발생');
  }
})

module.exports = router;
