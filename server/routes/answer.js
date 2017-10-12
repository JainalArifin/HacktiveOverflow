const express = require('express')
const router = express.Router()
const answerController = require('../controller/answerController')
const auth = require('../helper/jwt')

router.get('/', auth.isLogin, answerController.findAllAnswer)
router.post('/:id', auth.isLogin, answerController.createAnswer)
router.get('/:id', auth.isLogin, answerController.findByAnswer)
router.put('/:id', auth.isLogin, auth.authAnswer,  answerController.updateANswer)
router.delete('/:id', auth.isLogin, auth.authAnswer,  answerController.removeAnswer)

module.exports = router
