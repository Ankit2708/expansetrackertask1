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
                return res.json({message:'unable to create user'})
            }
            User.create({name:name,email:email,password:hash}).then(()=>{
                res.status(201).json({message:'user created successfully'})
            }).catch(err=>{
                res.status(403).json(err)
            })
        })
    })
}
const login=(req,res)=>{
    const {email,password}=req.body;
    console.log(password)
    User.findAll({where:{email}}).then(user=>{
        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,response){
                if(err){
                    console.log(err)
                    return res.json({success:false,message:'something went wrong'})
                }
                if(response){
                    console.log(JSON.stringify(user))
                    const jwttoken=generateAccessToken(user[0].id)
                    return res.json({token:jwttoken,message:'successfully logged in'})
                }else{
                    return res.status(401).json({success:false,message:'Passwords do not match'})
                }
            })
        }else{
            return res.status(404).json({success:false,message:'Passwords do not match'})
        }
    })
}
function generateAccessToken(id){
    return jwt.sign(id,process.env.TOKEN_SECRET)
}
module.exports={signUp,login}