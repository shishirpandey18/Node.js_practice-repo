const express=require('express')
const { postUser, postEmailConfirmation, signIn, forgetPassword } = require('../controllers/userControllers')
const router=express.Router()

router.post('/register',postUser)
router.put('/confirmation/:token',postEmailConfirmation)
router.post('/signin',signIn)
router.post('/forgetpassword',forgetPassword)


module.exports=router