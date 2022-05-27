const express=require('express')
const purchaseController=require('../controller/purchase')
const authmiddleware=require('../middleware/auth')
const router=express.Router()
router.get('/premiummembership',authmiddleware,purchaseController.premiumPurchase)
router.post('/updateTRansactionStatus',authmiddleware,purchaseController.updateTransactionStatus)
router.get('/getLatestUpdate',authmiddleware,purchaseController.getLatestUpdate)
module.exports=router;