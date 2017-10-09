const Answer = require('../models/answers')
const ObjectId = require('mongoose').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const findAllAnswer = (req, res) => {
  // console.log('masuk controller------->');
  let answer = jwt.verify(req.headers.token, process.env.SECRET, (err, answer) => {
    Answer.find()
    .then((dataAnswer) => {
      res.send(dataAnswer)
    })
    .catch((err) => {
      res.send(err)
    })
  })
}

const createAnswer = (req, res) => {
  let answer = jwt.verify(req.headers.token, process.env.SECRET, (err, answer) => {
    Answer.create({
      author: answer.id,
      jawaban: req.body.jawaban,
      questionId: [],
      suka:[],
      tidakSuka:[]
    })
    .then((dataAnswer) => {
      res.send({
        message: 'data Answer berhasil di buat',
        dataAnswer: dataAnswer
      })
    })
    .catch((err) => {
      console.log(err);
    })
  })
}

const findByAnswer = (req, res) => {
  Answer.findById(req.params.id)
  .then((dataAnswer) => {
    res.send(dataAnswer)
  })
  .catch((err) => {
    console.log(err);
  })
}

const updateANswer = (req, res) => {
  Answer.findOneAndUpdate({
    // _id: ObjectId(req.params.id)
    _id: req.params.id
  },{
    jawaban: req.body.jawaban
  })
  .then((dataAnswer) => {
    res.send({
      msg: 'Answer Berhasil di update',
      dataAnswer: dataAnswer
    })
  })
  .catch((err) => {
    console.log(err);
  })
}

const removeAnswer = (req, res) => {
  // res.send(' masuk ke kontroller')
  Answer.remove({
    _id: req.params.id
  })
  .then((dataAnswer) => {
    res.send({
      message: ' data berhasil di hapus',
      dataAnswer: dataAnswer
    })
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = {
  findAllAnswer,
  createAnswer,
  findByAnswer,
  updateANswer,
  removeAnswer
}
