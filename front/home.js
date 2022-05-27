const expanse=document.getElementById('expanse_form')
const expanse_item_count=document.getElementById('expanse_item_count')
let count=1
document.addEventListener('DOMContentLoaded',async()=>{
    const expanse_item_count=document.getElementById('expanse_item_count')
    var body=document.getElementsByTagName("BODY")[0]
    const expanse=document.getElementById('expanse')
    const expanse_form=document.getElementById('expanse_form')
    let premium=true
    if(premium){
        expanse_form.style.backgroundColor = "rgba(0, 0, 0, 0.855)"
        expanse_form.style.color = "white"
        expanse.style.backgroundColor = "rgba(0, 0, 0, 0.855)"
        body.style.backgroundImage  = "url('https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX24284715.jpg')"
        expanse.style.color = "white"
    }
    console.log('dom loaded')
    const token=localStorage.getItem('token')
    await axios.get('http://localhost:3000/getexpanse',{
        headers:{"Authorization":token}
    }).then(data=>{
        console.log(data.data)
        data=data.data
        for(let i=0;i<data.length;i++){
            expanse_item_count.innerHTML=expanse_item_count.innerHTML+`<div class="expanse_item">
            <p>${count}</p>
            <p>${data[i].expanseAmount}</p>
            <p>${data[i].description}</p>
            <p>${data[i].category}</p>
            </div>`
            count++
        }
    })

})
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
        e.target.money.value='';
        e.target.description.value='';
        e.target.category.value='';
        const data=data.data.expanse;
        expanse_item_count.innerHTML=expanse_item_count.innerHTML+`<div class="expanse_item">
        <p>${count}</p>
        <p>${data[i].expanseAmount}</p>
        <p>${data[i].description}</p>
        <p>${data[i].category}</p>
        </div>`
        count++
        
    }).catch(err=>console.log(err))
})