const Razorpay=require('razorpay')
const Order = require('../models/order')
const order=require('../models/order')
const premiumPurchase=(req,res)=>{
    try{
        var rzrInstance=new Razorpay({
            key_id:process.env.RazorPay_key_id,
            key_secret:process.env.RazorPay_key_secret
        })
        const amount=1999
        rzrInstance.orders.create({amount,currency:'INR'},(err,order)=>{
            if(err){
                throw new Error(err);
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'})
            .then(()=>{
                return res.status(201).json({order,key_id:rzrInstance.key_id})
            }).catch(err=>{
                throw new Error(err)
            })
        })
    }catch(error){
        res.status(403).json({message:'something went wrong',error:error})
    }
}
const updateTransactionStatus=(req,res)=>{
    try{
        const {payment_id,order_id}=req.body;
        Order.findOne({where:{orderid:order_id}}).then((order)=>{
            order.update({paymentid:payment_id,status:'SUCCESSFUL'}).then(()=>{
                req.user.update({ispremiumuser:true})
                return res.status(202).json({'success':true,message:'Transaction successful'})
            }).catch(err=>{
                throw new Error(err)
            })
        })
    }catch(err){
        res.status(403).json({error:err,message:'Something went wrong'})
    }
}
const getLatestUpdate=(req,res)=>{
    req.user.getOrders({limit:1,order:[['createdAt','DESC']]}).then(response=>{
        response.json(data)
    })
}
module.exports={premiumPurchase,updateTransactionStatus,getLatestUpdate}