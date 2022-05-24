const Sequelize=require('sequelize')
const sequelize=require('..util/database');
const Expanse=sequelize.define('expanses',{
   id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
   },
   expanseAmount:Sequelize.DOUBLE,
   category:Sequelize.STRING,
   description:Sequelize.STRING
});
module.exports=Expanse;