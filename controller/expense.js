const Expense = require('../models/expenses');
const User = require('../models/users');

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
    getExpenseById
}