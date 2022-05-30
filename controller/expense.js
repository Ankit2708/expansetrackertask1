const Expense = require('../models/expenses');
const User = require('../models/users');
const {BlobServiceClent}=require('@azure/storage-blob')
const {v1:uuidv1}=require('uuid')

const addexpense = (req, res) => {
    const { expenseamount, description, category } = req.body;
    req.user.createExpense({ expenseamount, description, category }).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(403).json({success : false, error: err})
    })
}

const getexpenses = (req, res)=> {

    req.user.getExpenses().then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        return res.status(402).json({ error: err, success: false})
    })
}

const deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    Expense.destroy({where: { id: expenseid }}).then(() => {
        return res.status(204).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed"})
    })
}
const downloadExpenses= async(req,res)=>{
    try{
        if(!req.user.ispremiumuser){
            return res.status(401).json({success:false,message:'user is not premium'})
        }
        const AZURE_STORAGE_CONNECTION_STRING=process.env.AZURE_STORAGE_CONNECTION_STRING
        const blobServiceClent=BlobServiceClent.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
        const containerName= 'shivhareankit2708expensetracker';
        console.log('/nCreatingContainer')
        console.log('/t,containerName')
         // Get a reference to a container
        const containerClient= await blobServiceClent.getContainerClient(containerName)
        if(!containerClient.exists()){
            const createContainerResponse= await containerClient.create({access:'container'})
            console.log("container was created successfully. requestId",createContainerResponse.requestId)
        }
        const blobName='expenses'+uuidv1+'txt';
         // Get a block blob client
         const blockBlobClient=containerClient.getblockBlobClient(blobName)
         console.log('\nUploading to Azure storage as blob:\n\t', blobName);
         const data=JSON.stringify(await req.user.getExpenses())
        const uploadBlobResponse=await blockBlobClient.upload(data,data.length)
        console.log("Blob was uploaded successfully. requestId: ", JSON.stringify(uploadBlobResponse));
        const fileUrl = `https://demostoragesharpener.blob.core.windows.net/${containerName}/${blobName}`;
        res.status(201).json({success:true,message:'successfully downloaded'})
    }catch(err){
        res.status(500).json({error:err,success:false,message:'something went wrong'})
    }
}
const getAllExpense=(req,res)=>{
    Expense.findAll().then(data=>{
        var k=data[0]
        k['total']=424
        res.json(data.total)
    })
}
const getExpenseById=(req,res)=>{
    const id=req.params.userId
    Expense.findAll({where:{userId:id}}).then(expense=>{
        User.findByPk(id).then(user=>{
            res.json({expense,name:user.name})
        })
    })
}

module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
    getAllExpense,
    getExpenseById,
    downloadExpenses

}