const bcrypt=require('bcrypt')
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const signUp=(req,res)=>{
    const {name,email,password}=req.body;
    const saltRounds=10;
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        bcrypt.hash(password,salt,function(err,hash){
            if(err){
                console.log(err)
                res.json({message:'unable to create user'})
            }
            User.create({name,email,password:hash}).then(()=>{
                res.status(201).json({message:'user created successfully'})
            }).catch(err=>{
                res.status(403).json(err)
            })
        })
    })
}
function generateAccessToken(id){
    return jwt.sign(id,process.env.TOKEN_SECRET)
}
module.exports=signUp