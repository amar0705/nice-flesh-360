let baseurl="http://localhost:8080"
var stylistArea=document.getElementById("main-cont")
let arr
fetchdata()

 async function fetchdata(){
    try{
   let res  = await fetch(`${baseurl}/stylist/male`)
   data = await res.json()
   arr=data
        getdata(arr)
    }
    catch(err){
       console.log(err)
    }
}


function getdata(data){
stylistArea.innerHTML=""
stylistArea.innerHTML=`
${data.map((item)=>{
    return getasCard(item)
}).join(" ")}
`
booknow()
}


function getasCard(item){
    return `
    <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${item.image_urls} alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${item.Stylists_name}</h5>
              <p class="card-text">${item.descriptions.substring(0,60)+"..."}</p>
              <button data-id= ${item._id} class="btn btn-primary">Book Now</button>
            </div>
          </div>
    `
}




function booknow(){
let book = document.querySelectorAll('.btn')

for(let btn of book){
btn.addEventListener("click",(e)=>{
console.log(e.target.dataset.id)
popup.classList.toggle("show");
})
} 
}

let popup = document.querySelector(".popup")
 let closed = document.querySelector(".close")
   

    closed.onclick = ()=>{
      popup.classList.remove("show");
    }


