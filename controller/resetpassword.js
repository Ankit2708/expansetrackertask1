const uuid=require('uuid')
const sgMail=require('@sendgrid/mail')
const bcrypt=require('bcrypt')
const User=require('../models/users')
const Forgotpassword=require('../models/forgotpassword')
const forgotpassword=async (req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({where:{email}})
        if(user){
            const id=uuid.v4()
            user.createForgotpassword({id,active:true})
            .catch(err=>{
                throw new Error(err)
            })
            sgMail.setApiKey(process.env.SENGRID_API_KEY)
            const msg={
                to:'test@example.com',
                from:'shivhare.ankit476@gmail.com',
                subject:'Reset password link',
                text:'Here is a link attached to reset your password',
                html:`< href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>"`,
            }
            sgMail
            .send(msg).then(response=>{
                // console.log(response[0].statusCode)
                // console.log(response[0].headers)
                return res.status(response[0].statusCode).json({message:'link to reset your password sent to your mail'})
            }).catch(err=>{
                throw new Error(err)
            })
        }else{
            throw new Error('user does not exist')
        }
    }catch(err){
        return res.json({success:false,message:err})
    }
}
const resetpassword=(req,res)=>{
    const id=req.params.id
    Forgotpassword.findOne({where:{id}}).then(forgotpasswordrequest=>{
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({active:false})
            res.statusCode(202).send(`<html>
            <script>function formsubmitted(e){
                e.preventDefault()
                console.log('called')
            }</script>
            <form action="/password/updatepassword/${id}"method="get">
            <label for="newpassword>Enter new password></label>
            <input type="password" name="newpassword"required></input>
            <button>reset password</button>
            </form>
            </html>`)
        }
        res.end()
    
    })
}
const updatepassword=(req,res)=>{
    try{
        const {newpassword}=req.query;
        const {resetpasswordid}=req.params
        Forgotpassword.findOne({where:{id:resetpasswordid}}).then(resetpasswordrequest=>{
            User.findOne({where:{id:resetpasswordrequest.userId}}).then(user=>{
                if(user){
                    const saltRounds=10;
                    bcrypt.genSalt(saltRounds,function(err,salt){
                        if(err){
                            console.log(err)
                            throw new Error(err)
                        }
                        bcrypt.hash(newpassword,salt,function(err,hash){
                            if(err){
                                console.log(err)
                                throw new Error(err)
                            }
                            user.update({password:hash}).then(response=>{
                                res.status(202).json({message:'Successfully updated the password'})
                            })
                        })
                    })
                }else{
                    return res.status(404).json({message:'no such user exist'})
                }
            })
        })
        
    }catch(error){
        res.status(403).json({success:false,error})
    }

}
module.exports={
    forgotpassword,resetpassword,updatepassword
}