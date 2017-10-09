const User = require('../models/users')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const findAllUsers = (req, res) => {
  User.find({})
  .then((dataUser) => {
    res.send(dataUser)
  })
  .catch((err) => {
    res.send(err)
  })
}

const signUpUser = (req, res) => {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(`${req.body.password}`, salt)
  User.create({
    username: req.body.username,
    password: hash
  })
  .then((dataUser) => {
    res.send({
      message: 'data berhasil di tambahkan',
      dataUser: dataUser
    })
  })
  .catch((err) => {
    res.send(err)
  })
}

const loginUser = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .then((dataUser) => {
    if(dataUser == null){
      // console.log('--ini kalo null--->', dataUser);
      res.send({
        msg: 'username not found'
      })
    }
    else {
      if(bcrypt.compareSync(req.body.password, dataUser.password)){
        // console.log('----->', dataUser.password);
        var token = jwt.sign({
          id: dataUser.id,
          username: dataUser.username
        },process.env.SECRET)
        res.send({
          msg: 'login success',
          data:token
        })
      }else{
        res.send({
          msg: 'password tidak di kenali'
        })
      }
    }
  })
  .catch((err) => {
    res.send(err)
  })
}

const removeUser = (req, res) => {
  User.findByIdAndRemove({
    _id: ObjectId(req.params.id)
  })
  .then((dataUser) => {
    res.send({
      msg: 'user berhasil di hapus',
      dataUser: dataUser
    })
  })
}

module.exports = {
  findAllUsers,
  signUpUser,
  loginUser,
  removeUser
}
