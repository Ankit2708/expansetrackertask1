const express=require('express')
const userController=require('../controller/user')
const authmiddleware=require('../middleware/auth')
const router=express.Router()
router.post('/signUp',userController)
module.exports=router;