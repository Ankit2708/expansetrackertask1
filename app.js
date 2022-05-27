const express=require('express')
const bcrypt=require('bcrypt')
const path=require('path')
let cors=require('cors')

const sequelize=require('./util/database')
const User=require('./models/user')
const userRoutes=require('./routes/user')
const dotenv=require('dotenv')
const app=express()
dotenv.config()
app.use(cors())
app.use(express.json())
// app.get('/user/signup', (req, res)=>{
//     const { name, email, password } = req.body;
//     const saltRounds = 10;
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         bcrypt.hash(password, salt, function(err, hash) {
//             //Store hash in your password DB.
//             if(err){
//                 console.log(err)
//                 console.log('Unable to create new user')
//                 res.json({message: 'Unable to create new user'})
//                 return

//             }else{
//                 User.create({ name, email, password: hash }).then(() => {
//                     return res.status(201).json({message: 'Successfuly create new user'})
//                 }).catch(err => {
//                     res.status(403).json(err);
//                 })
    
//             }
            
//         });
//     });
// } );

function generateAccessToken(id) {
    return jwt.sign(id ,process.env.TOKEN_SECRET);
}
app.use('/user',userRoutes)
sequelize.sync().then(()=>{
    app.listen(3000)
    console.log('database is connected')
}).catch(err=>console.log(err))
