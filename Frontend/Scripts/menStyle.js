let baseurl="https://elegant-hare-dungarees.cyclic.app"
    var styleArea=document.getElementById("container")
    let arr
    fetchdata()

    async function fetchdata(){
        try{
            let res  = await fetch(`${baseurl}/style/male`)
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
        booknow()
        }


    function getasCard(item){
        return `
        <div class="card">
            <img src=${item.Image} class="card-img" alt="">
            <div class="card-body">
                <h1 class="card-title">${item.Name}</h1>
                <p class="card-sub-title">${item.Price}</p>
                <p class="card-info">${item.Gender}</p>
                <button data-id= ${item._id} class="card-btn">Book Now</button>
            </div>
        </div> 
        `
    }




    function booknow(){
    let book = document.querySelectorAll('.card-btn')
    for(let btn of book){
    btn.addEventListener("click",(e)=>{
    alert(e.target.dataset.id)
    let style

    for(let i=0;i<arr.length;i++){
        if(arr[i]._id==e.target.dataset.id){
            style = arr[i]
        
        }
    }

    localStorage.setItem("style", JSON.stringify(style))
    window.location.href="MensStylist.html"
    })
    } 
    }

