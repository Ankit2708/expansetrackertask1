const Expanse=require('../models/expanse')

const addExpanse=(req,res)=>{
    const {expanseAmount,category,description}=req.body;
    req.user.createExpanse({expanseAmount,category,description}).then((expanse)=>{
        return res.status(201).json({success:true,expanse})
    }).catch(err=>{
        return res.status(403).json({success:false,error:err})
    })
}
const getExpanse=(req,res)=>{
    req.user.getExpanses().then(expanses=>{
        
        return res.status(200).json({success:true,expanses})
    }).catch(err=>{
        return res.status(403).json({success:false,error:err}) 
    })
}
const deleteExpanse=(req,res)=>{
    const expanseId=req.params.expanseId;
    Expanse.destroy({where:{id:expanseId}}).then(()=>{
        return res.status(204).json({success:true,message:'deleted successfully'})
    }).catch(err=>{
        return res.status(403).json({success:false,message:"failed"}) 
    })
}
module.exports={addExpanse,getExpanse,deleteExpanse}