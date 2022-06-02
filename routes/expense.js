//const User = require("../models/users");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const express = require('express');
const authmiddleware=require('../middleware/auth')
const expenseController = require('../controller/expense');

const router = express.Router();
router.post('/addexpense',authmiddleware.authenticate,expenseController.addexpense)
router.get('/getexpense',authmiddleware.authenticate,expenseController.getexpenses)
router.get('/getallexpense',expenseController.getAllExpense)
router.get('/getexpensebyid/:userId',expenseController.getExpenseById)
module.exports=router;