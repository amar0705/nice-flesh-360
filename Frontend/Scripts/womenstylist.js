let baseurl="http://localhost:8080"
var stylistArea=document.getElementById("main-cont")
let arr
fetchdata()

 async function fetchdata(){
    try{
   let res  = await fetch(`${baseurl}/stylist/female`)
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
}


function getasCard(item){
    return `
    <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${item.image_urls} alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${item.Stylists_name}</h5>
              <p class="card-text">${item.descriptions.substring(0,60)+"..."}</p>
              <a class="btn btn-primary">Book Now</a>
            </div>
          </div>
    `
}