let baseurl="http://localhost:8080"
const token=localStorage.getItem("token")
let container=document.getElementById("cont")
let arr


fetchdata()

async function fetchdata(){
let res= await fetch(`${baseurl}/appointment/users`,{
    headers:{
      "content-type": "application/json",
        "authorization":token
    }
})
let data= await res.json()
if(data.msg=="wrong token" || data.msg=="Please login first"){
    alert("Please Login")
  }
  else{
    arr=data
    console.log(data)
    getdata(data)
  }
  }




function getdata(data){
    container.innerHTML=""
    container.innerHTML=`
    ${data.map((item)=>{
        return getasCard(item)
    }).join(" ")}
    `
   cancelbtn()
    }
    
    
    function getasCard(item){
        return `
        <div class="profile_conteiner">
		<div class="image_conteiner">
		</div>
		<div class="text_conteiner">
			<div class="title">
				<h3>Style - ${item.style_name}</h3><br>
				<h4>Status - ${item.status}</h4><br>
				<h4>Styler - ${item.styler_name}</h4><br>
			</div>
			<div class="objective">
			<p>Appointment Date - ${item.date}</p>
			<p>Timmings - ${item.time}</p>
			</div><br>
      ${item.status==="Pending"?
			`<div class="btn">
				 <center><p data-id=${item._id} class="cancel">Cancel</p></center>
			</div><br>`:`` }
			
		</div>
	</div>
        `
    }



    function cancelbtn(){
      let cancel = document.querySelectorAll('.cancel');
      
      for(let btn of cancel){
        btn.addEventListener('click',(e)=>{
          e.preventDefault();
          deletebook(e.target.dataset.id);
        })
      }

    }


    async function deletebook(id){
      try{
     let res= await fetch(`${baseurl}/appointment/delete/${id}`,{
        method:'DELETE',
        headers:{
          "content-type": "application/json",
          "authorization":token
        }
      })
      if (res.ok) {
        alert("Appointment is successfully canceled");
        fetchdata()
        ;
      } else {
        alert("Unable to cancel the appointment!");
      }
    } catch (error) {
      console.log(error.message);
      alert("Unable to cancel the appointment!");
    }

    }