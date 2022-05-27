const express=require('express')

const userController=require('../controller/user')
const expanseController=require('../controller/expanse')
const authmiddleware=require('../middleware/auth')
const router=express.Router()
router.post('/signUp',userController.signUp)
router.post('/login',userController.login)
router.post('/addExpanse',authmiddleware.authenticate,expanseController.addExpanse)
router.get('/getExpanse',authmiddleware.authenticate,expanseController.getExpanse)
router.delete('/deleteExpanse/:expanseId',authmiddleware.authenticate,expanseController.deleteExpanse)
module.exports=router;