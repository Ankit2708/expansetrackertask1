const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const express = require('express');
const authmiddleware=require('../middleware/auth')
const expenseController = require('../controllers/expense');

const router = express.Router();
router.post('/addexpense',authmiddleware,expenseController.addexpense)
router.get('/getexpense',authmiddleware,expenseController.getexpense)
router.get('/getallexpense',expenseController.getAllExpense)
router.get('/getexpensebyid/:userId',expenseController.getExpenseById)
module.exports=router;