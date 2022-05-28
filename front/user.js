const expenseForm=document.getElementById('expense_form')
const expense_item_cont=document.getElementById('expense_item_cont')
const token=localStorage.getItem('token')
let count=1
document.addEventListener('DOMContentLoaded',async()=>{
    let paramstring=window.location.href;
    const id=paramstring.split('userid=')[1]
    const expense_item_cont=document.getElementById('expense_item_cont')
    var body=document.getElementsByTagName('BODY')[0]
    const expense=document.getElementById('expense')
    const token=localStorage.getItem('token')
    await axios.get(`http://localhost:3000/getexpensebyid/${id}`,{headers:{Authorization:token}})
    .then((data)=>{
        const usernameCont=document.getElementById('username_show')
        usernameCont.innerHTML=`<b class=>${data.data.name}</b>`
        data=data.data.expense
        for(let i=0;i<data.length;i++){
            expense_item_cont.innerHTML=expense_item_cont.innerHTML+`<div>
            <p>${count}</p>
            <p>${data[i].expenseamount}</p>
            <p>${data[i].category}</p>
            <p>${data[i].description}</p>

            </div>`
        }

    })


})