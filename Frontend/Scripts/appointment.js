let baseurl="https://elegant-hare-dungarees.cyclic.app"
const token=localStorage.getItem("token")
let container=document.getElementById("cont")
let arr

window.addEventListener("load",()=>{
if(token){
  fetchdata()
}
else{
  return  Swal.fire(
    'warning!',
    '<h3> Please Login</h3>',
    'warning'
  ).then((res)=>{
    window.location.href = "login.html"
  })
}
})

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
        <div class="profile_container">
		<div class="image_container">
		</div>
		<div class="text_container">
			<div class="title">
				<h3>Style - ${item.style_name}</h3><br>
				<h4>Status - ${item.status}</h4><br>
				<p class="styler">Styler - ${item.styler_name}</p><br>
			</div>
			<div class="objective">
			<p>Appointment Date - ${item.date}</p>
			<p>Timmings - ${item.time}</p>
			</div><br>
      ${item.status==="Pending"?
			`<div class="bton">
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