let baseurl = "http://localhost:8080"
const token = localStorage.getItem("token")
const stylearr = localStorage.getItem("style")
var stylistArea = document.getElementById("all_products")
let arr
let stylist
fetchdata()

async function fetchdata() {
  try {
    let res = await fetch(`${baseurl}/stylist`)
    data = await res.json()
    arr = data
    getdata(arr)
  }
  catch (err) {
    console.log(err)
  }
}


function getdata(data) {
  stylistArea.innerHTML = ""
  stylistArea.innerHTML = `
${data.map((item) => {
    return getasCard(item)
  }).join(" ")}
`
  viewappointments()
}


function getasCard(item) {
  return `
   

    <div class="card card-1">
  
      <img src=${item.image_urls}>
  
      <div class="card-details">
  
        <h3 class="card-details-title">${item.Stylists_name}</h3>
  
        <div class="card-details-social">
        <div class="btn">
        <center><p data-id= ${item._id} class="btn btn-primary">Appointments</p></center>
        </div>
        </div>
  
      </div>
      </div>

    `
}




function viewappointments() {
  let book = document.querySelectorAll('.btn')

  for (let btn of book) {
    btn.addEventListener("click", (e) => {
      getappointment(e.target.dataset.id)

    })
  }
}



function getappointment(id) {
  localStorage.setItem("stylist_id", id)
  window.location.href = "admin_appointments.html"
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