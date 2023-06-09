let baseurl = "https://elegant-hare-dungarees.cyclic.app"

const token = localStorage.getItem("admin")
window.addEventListener("load", () => {
  if (token) {
    display()
  }
  else {
    // alert("Login first")
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'SalonLex - Please Login first!',
      footer: '<a href="../Frontend/login.html">Log in</a>'
    }).then((res) => {
      window.location.href = "login.html"
    })
  }
})


function display() {

  //code for navbar cursal
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".sidebarBtn");
  sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  };


  let container = document.getElementById("all_products")
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
      // alert("Please Login")
      Swal.fire(
        'Good job!',
        '<h3> SalonLex - Proceed to Login 👍</h3>',
        'success'
      )
    }

    else {
      arr = data
      if (data.length == 0) {
        // alert("You have no Appointments")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You have no Appointments!',
        }).then((res)=>{
          window.location.href="admin_stylists.html"
        })
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
      ${item.status == "Pending" ? `<div class="bton">
      <center><p data-id=${item._id} class="Approve">Approve</p></center>
   </div>` : (item.status == "Confirmed" ? `<div class="bton">
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
        return  Swal.fire(
          '',
          '<h3> Booking Cancelled</h3>',
          'success'
        ).then((res)=>{
         fetchdata()
        })
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

  document.getElementsByClassName("log_out")[0].addEventListener("click", async (e) => {
    e.preventDefault()
    try {
      let res = await fetch(`${baseurl}/users/logout`, {
        headers: {
          "content-type": "application/json",
          "authorization": token
        }
      })
      let data = await res.json()
      if (data.msg == "Logout Success") {
        localStorage.clear("admin");
        //    alert("logout succes")
        Swal.fire(
          'Good job!',
          '<h3> Logout Successfully! See You Soon 👍</h3>',
          'success'
        ).then((res) => {
          window.location.href = "index.html"
        })
      }
    } catch (err) {
      console.log(err)
    }

  });

}