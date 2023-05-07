let baseurl = "http://localhost:8080"
let container = document.getElementById("all_products")
const token = localStorage.getItem("token")
const stylist_id = localStorage.getItem("stylist_id")
let arr

fetchdata()

async function fetchdata() {
  let res = await fetch(`${baseurl}/appointment/stylist/${stylist_id}`, {
    headers: {
      "authorization": token
    }
  })
  let data = await res.json()
  if (data.msg == "wrong token" || data.msg == "Please login first") {
    alert("Please Login")
  }
  else {
    arr = data
    if (data.length == 0) {
      alert("You have no Appointments")
      return
    }
    console.log(data)
    getdata(data)
  }
}

function getdata(data) {
  container.innerHTML = ""
  container.innerHTML = `
    ${data.map((item) => {
    return getasCard(item)
  }).join(" ")}
    `
  cancelbtn()
  approvebtn()
}


function getasCard(item) {
  return `
  <div class="profile_container">
		<div class="image_container">
		</div>
		<div class="text_container">
			<div class="title">
				<h3>Style - ${item.style_name}</h3><br>
				<h4>Status - ${item.status}</h4><br>
			</div>
			<div class="objective">
			<p>Appointment Date - ${item.date}</p>
			<p>Timmings - ${item.time}</p>
			</div><br>
      ${item.status=="Pending" ? `<div class="bton">
      <center><p data-id=${item._id} class="Approve">Approve</p></center>
   </div>` :  (item.status=="Confirmed" ? `<div class="bton">
   <center><p data-id=${item._id} class="cancel">Cancel</p></center>
</div>` : '')}
			
            
			
		</div>
	</div>
        `
}



function cancelbtn() {
  let cancel = document.querySelectorAll('.cancel');

  for (let btn of cancel) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      deletebook(e.target.dataset.id);
    })
  }

}

function approvebtn() {
  let approve = document.querySelectorAll('.Approve');

  for (let btn of approve) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      Approve(e.target.dataset.id);
    })
  }

}


async function deletebook(id) {
  try {
    let res = await fetch(`${baseurl}/appointment/${id}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        "authorization": token
      },
      body: JSON.stringify({ status: "Cancelled" })
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

async function Approve(id) {
  try {
    let res = await fetch(`${baseurl}/appointment/${id}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        "authorization": token
      },
      body: JSON.stringify({ status: "Confirmed" })
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
     
 userDetails();
function userDetails() {
    let admin = JSON.parse(localStorage.getItem("adminData"));
    let cont = document.getElementById("admin_name");
    let cont2 = document.getElementById("img-admin");

    cont2.innerHTML = `<img src="${admin[0].image}">`
    cont.innerHTML = `${admin[0].name}`
};

document.getElementsByClassName("log_out")[0].addEventListener("click", () => {
     localStorage.clear("admin");
});
}
