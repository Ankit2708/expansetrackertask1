const Sequelize=require('sequelize')
const sequelize=new Sequelize('ExpenseTracker','root','2708@@1991As',{
    dialect:'mysql',
    host:process.env.DB_host
})
module.exports=sequelize;