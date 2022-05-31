const token = localStorage.getItem('token');
function addNewExpense(e){
    e.preventDefault();
    const form = new FormData(e.target);

    const expenseDetails = {
        expenseamount: form.get("expenseamount"),
        description: form.get("description"),
        category: form.get("category")

    }
    console.log(expenseDetails)
    axios.post('http://localhost:3000/user/addexpense',expenseDetails, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 201){
        addNewExpensetoUI(response.data.expense);
    } else {
        throw new Error('Failed To create new expense');
    }

    }).catch(err => showError(err))

}

window.addEventListener('load', async()=> {
    document.getElementById('row-per-page').value=localStorage.getItem('noofrows')
    var token=localStorage.getItem('token')
    if(!token){
        window.location.replace('./login.html')
    }
    var page = location.href.split("page=").slice(-1)[0] || 1;
    console.log(page)
    if(page.length>3){
        page=1
    }
    await axios.get(`http://localhost:3000/user/getexpenses?page=${page}`, { headers: {"Authorization" : token} }).then(response => {
    var rows=localStorage.getItem('noofrows')
    rows=rows||10
    var totalPages=response.data.totalPages; 
    await axios.get(`http://localhost:3000/user/getexpenses?page=${page}&rowno=${rows}`).then(data=>{
        console.log(data.data)
        var totalpages=data.data.totalpages
        data=data.data.expense
        for(let i=0;i<data.length;i++){
            expense_item_cont.innerHTML=  expense_item_cont.innerHTML+` <div class="expense_item">
            <p>${count}</p>
            <p>${data[i].expenseamount}</p>
            <p>${data[i].description}</p>
            <p>${data[i].category}</p>
            <p>${data[i].createdAt}</p>
    
        </div>`
            count++;
        }
        console.log(totalpages)
        
    })   
    if(response.status === 200){
            response.data.expenses.forEach(expense => {

                addNewExpense(expense);
            })
        } else {
            throw new Error();
        }
        CreatingPagination(totalPages)
    })
})

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}

function deleteExpense(e, expenseid) {
    axios.delete(`http://localhost:3000/user/deleteexpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 204){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}
function download(){
    axios.get('http://localhost:3000/download',{headers:{"Authorization":token}})
    .then(response=>{
        if(response.status===201){
            var a =document.createElement('a')
            a.href=response.data.fileUrl;
            a.download='myexpense.csv';
            a.click()
        }else{
            throw new Error(response.data.message)
        } 
    }).catch(err=>{
        showError(err)
    })
}


document.getElementById('rzp-button1').onclick = async function (e) {
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}
function CreatingPagination(){
    const paginationContainer=document.getElementById('pagination')
    for(let i=0;i<=totalPages;i++){
        const a=`<a href="./home.html?page=${i}">${i}></a>`
        paginationContainer.innerHTML+=a
    }
}
function logout(){
    document.getElementById('logout_button').addEventListener('click',()=>{
        localStorage.clear()
        window.location.replace('./login.html')
    })
}
document.getElementById('row-per-page').onchange=function(e){
    localStorage.setItem('noofrows',e.target.value)
}
