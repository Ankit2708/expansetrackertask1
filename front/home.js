const User = require("../models/user")

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
    let premium1=false;
    await axios.get('http://localhost:3000/getLatestPaymentUpdate',{headers:{"Authorization":token}}).then(premiumdata=>{
        if(premiumdata.data[0]==='SUCCESSFUL'){
            const prebtn=document.getElementById('premium_button')
            premium1=true
            premiumFun(premium1)
            prebtn.innerHTML='<h2 class=premium_user>Premim User</h2>'
        }else{
            premiumFun(false)
        }
    })
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
let premium=false;
function premiumFun(premium){
    const expanse_item_count=document.getElementById('expanse_item_count')
    var body=document.getElementsByTagName("BODY")[0]
    const expanse=document.getElementById('expanse')
    const expanse_form=document.getElementById('expanse_form')
    if(premium){
        expanse_form.style.backgroundColor = "#1f1e1f"
        expanse_form.style.color = "white"
        expanse.style.backgroundColor = "#1f1e1f"
        body.style.backgroundImage  = "url('https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX24284715.jpg')"
        expanse.style.color = "white"
    }else{
        expanse_form.style.backgroundColor = "white"
        expanse_form.style.color = "black"
        expanse.style.backgroundColor = "white"
        body.style.backgroundImage  = "url('https://plexcollectionposters.com/images/2021/05/16/background-images-for-login-page3bc68c53b0db224b.jpg')"
        expanse.style.color = "black"
    }
}
function buyPremium(){
    const premiumBtn=document.getElementById('premium_btn')
    premiumBtn.addEventListener('click',async(e)=>{
        e.preventDefault()
        const response=await axios.get('http://localhost:3000/premiummember',{headers:{"Authorization":token}})
        var options=
        {
            "Key":response.data.key_id,
            "name":'Test Company',
            "order_id":response.data.order.id,
            "prefill":{
                "name":"Test User",
                "email":"abc@gmail.com",
                "contact":"8796541236"

            },
            "theme":{
                "color":"#3399cc"
            },
            "handler":function(response){
                axios.post('http://localhost:3000/updatetransactionstatus',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id
                },{headers:{"Athorization":token}}).then(()=>{
                    alert('you are a premium member')
                    premiumFun(true)
                }).catch(err=>{
                    alert('something went wrong')
                })
            }
        }
        const rzp1=new Razorpay(options);
        rzp1.open();
        e.preventDefault()
        rzp1.on('payment failed',(response)=>{
            alert(response.error.code)
            alert(response.error.description)
            alert(response.error.source)
            alert(response.error.step)
            alert(response.error.reason)
            alert(response.error.metadata.order_id)
            alert(response.error.metadata.payment_id)
        })
    })
}
buyPremium()