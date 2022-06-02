const path = require('path');

const express = require('express');
const fs=require('fs')
var cors = require('cors')
const morgan=require('morgan')
const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');

const Forgotpassword=require('./models/forgotpassword')


const helmet=require('helmet');
const userRoutes = require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const resetpasswordRoutes=require('./routes/resetpassword')
const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
const errorLogStream=fs.createWriteStream(path.join(__dirname,'error.log'),{flags:'a'})


const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

app.use(helmet())//provide secure http headers
app.use(cors());
//app.use(morgan('combined',{access:accessLogStream}))//morgan is http request logger
app.use(morgan('combined',{access:errorLogStream},{skip:(req,res)=>{return res.statusCode<400}}))
app.use(express.static(path.join(__dirname,'./front/ExpenseTracker')))
app.use(express.urlencoded({extended:false}))

// app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes)
app.use('/expense',expenseRoutes)

app.use('/purchase', purchaseRoutes)
app.use('/password',resetpasswordRoutes)





User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword)
Forgotpassword.belongsTo(User)



sequelize.sync({force:true})
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
