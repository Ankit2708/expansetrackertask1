const Sequelize=require('sequelize')
const sequelize=new Sequelize('ExpanseTracker','root','2708@@1991As',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;