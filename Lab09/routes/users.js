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
  studentId: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  score: {
    type: Number,
  },
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('DB is connected');
  mongoose.connection.on('error', (error) => {
    res.status(500).send('DB 연결 오류', error);
  })
});

router.get('/all', async function(req, res, next) {
  const model = mongoose.model("student", studentSchema);
  try {
    const result = await model.find({});
    res.send(result);
    mongoose.connection.on('error', (error) => {
      res.status(500).send('DB 연결 오류', error);
    })
  } catch(e) {
    res.status(500).send('오류 발생');
  }
});

router.get("/:studentId", async function(req, res, next) {
  const model = mongoose.model("student", studentSchema);
  const id = req.params.studentId;
  try {
    const result = await model.find({studentId: id});
    if(result.length === 0) {
      res.status(404).send('Not Found');
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

router.post('/', async function(req, res, next) {
  const body = req.body;
  const model = mongoose.model("student", studentSchema);
  const result = await model.find({studentId: body.studentId});
  if (!body.studentId){
    res.status(400).send('학번이 입력되지 않았습니다.');
  } else if(result.length !== 0) {
    res.status(400).send('이미 저장된 정보입니다.');
  } else {
    try {
      let data = await model.create({studentId: body.studentId, name: body.name, score: body.score});
      await data.save();
      res.send(data);
      mongoose.connection.on('error', (error) => {
        res.status(500).send('DB 연결 오류', error);
      })
    } catch(e) {
      res.status(500).send('DB 저장 에러');
    }
  }
})

router.put('/', function(req, res, next) {
    res.status(400).send('학번이 지정되지 않았습니다.');
})

router.put('/:studentId', async function(req, res, next) {
  const body = req.body;
  const model = mongoose.model("student", studentSchema);
  const id = req.params.studentId;
  let data = await model.find({studentId: id});
  
  if(data.length === 0) {
    res.status(404).send('데이터가 존재하지 않습니다.');
  } else if(body.studentId) {
    res.status(400).send('학번은 변경할 수 없습니다.');
  } else {
    try {
      await model.updateOne({studentId: id}, {name: body.name, score: body.score});
      data = await model.find({studentId: id});
      res.send(data);
      mongoose.connection.on('error', (error) => {
        res.status(500).send('DB 연결 오류', error);
      })
    } catch (e) {
        res.status(500).send('오류 발생');
    }
  }
})

router.delete('/:studentId', async function(req, res, next) {
  const body = req.body;
  const model = mongoose.model("student", studentSchema);
  const id = req.params.studentId;
  let data = await model.find({studentId: id});
  try {
    if(data) {
      await model.deleteOne({studentId: id})
      res.send('success');
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

