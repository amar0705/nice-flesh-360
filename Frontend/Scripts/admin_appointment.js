let baseurl="http://localhost:8080"
let container=document.getElementById("cont")
const stylist_id=localStorage.getItem("stylist_id")
let arr


fetchdata()

async function fetchdata(){
let res= await fetch(`${baseurl}/appointment/stylist/${stylist_id}`,{
    headers:{
        "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InIiLCJ1c2VyaWQiOiI2NDUzYWZkZmZlNjgyMzYxMzUxMDMwYzkiLCJpYXQiOjE2ODMyMDYxNjl9.RuejxlSxQOWGt_e4s6fJWeOGE4Yz2rpqR7jlTnIE7hA"
    }
})
let data= await res.json()
if(data.msg=="wrong token" || data.msg=="Please login first"){
    alert("Please Login")
  }
  else{
    arr=data
    if(data.length==0){
        alert("You have no Appointments")
        return
    }
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
   approvebtn()
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
			</div>
			<div class="objective">
			<p>Appointment Date - ${item.date}</p>
			<p>Timmings - ${item.time}</p>
			</div><br>
      
			<div class="btn">
				 <center><p data-id=${item._id} class="Approve">Approve</p></center>
			</div>
            <div class="btn">
				 <center><p data-id=${item._id} class="cancel">Cancel</p></center>
			</div>
			
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

    function approvebtn(){
        let approve = document.querySelectorAll('.Approve');
        
        for(let btn of approve){
          btn.addEventListener('click',(e)=>{
            e.preventDefault();
            Approve(e.target.dataset.id);
          })
        }
  
      }


    async function deletebook(id){
      try{
     let res= await fetch(`${baseurl}/appointment/${id}`,{
        method:'PATCH',
        headers:{
          "content-type": "application/json",
          "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InIiLCJ1c2VyaWQiOiI2NDUzYWZkZmZlNjgyMzYxMzUxMDMwYzkiLCJpYXQiOjE2ODMyMDYxNjl9.RuejxlSxQOWGt_e4s6fJWeOGE4Yz2rpqR7jlTnIE7hA"
        },
        body: JSON.stringify({status:"Cancelled"})
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

    async function Approve(id){
        try{
       let res= await fetch(`${baseurl}/appointment/${id}`,{
          method:'PATCH',
          headers:{
            "content-type": "application/json",
            "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InIiLCJ1c2VyaWQiOiI2NDUzYWZkZmZlNjgyMzYxMzUxMDMwYzkiLCJpYXQiOjE2ODMyMDYxNjl9.RuejxlSxQOWGt_e4s6fJWeOGE4Yz2rpqR7jlTnIE7hA"
          },
          body: JSON.stringify({status:"Confirmed"})
        })
        if (res.ok) {
          alert("Appointment Confirmed");
          fetchdata()
          ;
        } else {
          alert("Unable to Approve the appointment!");
        }
      } catch (error) {
        console.log(error.message);
        alert("Unable to Approve the appointment!");
      }
  
      }