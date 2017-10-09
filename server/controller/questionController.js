const Question = require('../models/questions')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const findAllQuestion = (req, res) => {
  let question = jwt.verify(req.headers.token, process.env.SECRET, (err, question)=>{
    Question.find((err, dataQuestion) => {
      if(err){
        res.send(err)
      }else {
        res.send(dataQuestion)
      }
    })
  })
}

const createQuestion = (req, res) => {
  let question = jwt.verify(req.headers.token, process.env.SECRET, (err, question) => {
    console.log('----->', question);
    Question.create({
      author: question.id,
      judul: req.body.judul,
      content: req.body.content,
      answer: [],
      suka: [],
      tidakSuka: []
    })
    .then((dataQuestion) => {
      res.send({
        message: 'data question berhasil di buat',
        dataQuestion: dataQuestion
      })
    })
    .catch((err) => {
      console.error(err)
    })
  })
}

const findByIdQuestion = (req, res) => {
  Question.findById(req.params.id)
  .then((dataQuestion) => {
    res.send(dataQuestion)
  })
  .catch((err) => {
    console.log(err);
  })
}

const updateQuestion = (req, res) => {
  Question.findOneAndUpdate({
    _id: ObjectId(req.params.id)
  },{
    judul: req.body.judul,
    content: req.body.content
  })
  .then((dataQuestion) => {
    res.send({
      msg: 'Berhasil di update',
      dataQuestion: dataQuestion
    })
  })
  .catch((err) => {
    console.log(err);
  })
}


const removeQuestion = (req, res) => {
  // res.send('masuk controlller----->')
  Question.remove({
    // _id: ObjectId(req.params.id)
    _id: req.params.id
  })
  .then((dataQuestion) => {
    res.send({
      msg: 'berhasil di hapus',
      dataQuestion: dataQuestion
    })
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = {
  findAllQuestion,
  createQuestion,
  findByIdQuestion,
  updateQuestion,
  removeQuestion
}
