var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test', (error => {
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

const studentSchema = new mongoose.Schema({
  koreanName: {
    type: String,
  },
  englishName: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  studentId: {
    type: Number,
    unique: true,
    required: true,
  },
  department: {
    type: String,
  },
})

/* GET home page. */
// router.get('/get', function(req, res, next) {
//   let params = req.query.data;
//   res.status(200).send("get method: " + params);
// });

router.get("/get", async function(req, res, next) {
  const model = mongoose.model("student", studentSchema);
  const id = req.query.data;
  try {
    const result = await model.find({studentId: id});
    if(result.length === 0) {
      res.status(404).send('No such student');
      return;
    }
    res.send(result);
    mongoose.connection.on('error', (error) => {
      res.status(500).send('DB 연결 오류', error);
    })
  } catch(e) {
    res.status(400).send('필요한 정보가 없음');
  }
})

router.post('/post', async function(req, res, next) {
  const body = req.body;
  console.log(body);
  const model = mongoose.model("student", studentSchema);
  const result = await model.find({studentId: body.studentId});
  if (body.studentId.length === 0){
    res.status(401).send('학번이 입력되지 않았습니다.');
  } else if(result.length !== 0) {
    res.status(400).send('이미 저장된 정보입니다.');
  } else {
    try {
      let data = await model.create({koreanName: body.koreanName, englishName: body.englishName, photoURL: body.photoURL,studentId: body.studentId, department: body.department});
      await data.save();
      console.log(data);
      res.send(data);
      mongoose.connection.on('error', (error) => {
        res.status(500).send('DB 연결 오류', error);
      })
    } catch(e) {
      res.status(500).send('DB 저장 에러');
    }
  }
})

router.delete('/delete', async function(req, res, next) {
  const model = mongoose.model("student", studentSchema);
  const id = req.query.data;
  console.log(id);
  let data = await model.find({studentId: id});
  try {
    if(data) {
      await model.deleteOne({studentId: id})
      res.send(id);
    } else {
      res.status(404).send('데이터가 존재하지 않습니다.');
    }
    mongoose.connection.on('error', (error) => {
      res.status(500).send('DB 연결 오류', error);
    })
  } catch(e) {
    res.status(500).send('오류 발생');
  }
})

module.exports = router;
