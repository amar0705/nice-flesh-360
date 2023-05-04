let baseurl="http://localhost:8080"
    var styleArea=document.getElementById("container")
    let arr
    fetchdata()

    async function fetchdata(){
        try{
            let res  = await fetch(`${baseurl}/style/female`)
            data = await res.json()
            arr=data
            getdata(arr)
        }
            catch(err){
            console.log(err)
        }
    }


    function getdata(data){
        styleArea.innerHTML=""
        styleArea.innerHTML=`
        ${data.map((item)=>{
            return getasCard(item)
        }).join(" ")}
        `
        // booknow()
        }


    function getasCard(item){
        return `
        <div class="card" style="width: 18rem;">
                <img class="card-img-top" src=${item.Image} alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">${item.Name}</h5>
                <p class="card-text">${item.Price}</p>
                <p class="card-gender">${item.Gender}</p>
                 <button data-id= ${item._id} class="btn btn-primary">Book Now</button>
                </div>
            </div>
        `
    }




    // function booknow(){
    // let book = document.querySelectorAll('.btn')

    // for(let btn of book){
    // btn.addEventListener("click",(e)=>{
    // console.log(e.target.dataset.id)
    // popup.classList.toggle("show");
    // })
    // } 
    // }

    // let popup = document.querySelector(".popup")
    // let closed = document.querySelector(".close")
    

    //     closed.onclick = ()=>{
    //     popup.classList.remove("show");
    //     }

