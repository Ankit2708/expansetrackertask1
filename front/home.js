const expanse=document.getElementById('expanse_form')
expanse.addEventListener('submit',(e)=>{
    e.preventDefault()
    expanseAmount=e.target.money.value;
    description=e.target.description.value;
    category=e.target.category.value;
    const token=localStorage.getItem('token')
    console.log(token)
    axios.post('http://localhost:3000/addexpanse',{
        expanseAmount,
        description,
        category
    },{
        headers:{"Authorization":token}
    }).then((data)=>{
        console.log(data)
    }).catch(err=>console.log(err))
})