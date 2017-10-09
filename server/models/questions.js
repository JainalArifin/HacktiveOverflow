const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  judul: String,
  content: String,
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'answers'
  }],
  suka: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  tidakSuka: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
})

const questions = mongoose.model('questions', questionSchema)
module.exports = questions