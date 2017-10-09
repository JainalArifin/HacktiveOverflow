const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  question: [{
    type: Schema.Types.ObjectId,
    ref: 'questions'
  }],
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'answer'
  }]
})

const users = mongoose.model('users', userSchema)
module.exports = users
