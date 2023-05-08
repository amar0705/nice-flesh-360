const url = `https://elegant-hare-dungarees.cyclic.app`;

const token=localStorage.getItem("admin")
window.addEventListener("load",()=>{
    if(token){
        display()
    }
    else{
        // alert("Login first")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'SalonLex - Please Login first!',
            footer: '<a href="../Frontend/login.html">Log in</a>'
          }).then((res)=>{
            window.location.href = "login.html"
          })
    }
})

function display(){


// var token;
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

async function Fetch_admin() {

    let req = await fetch(`${url}/admin`);
    let res = await req.json();
   
    let admin_details = document.querySelector(".sales-details");

    let adminData = res;
    console.log(adminData);
    admin_details.innerHTML = adminData.map(el => {
        return `<div class="card">
        <div class="img"><img src="${el.image}" style="width:100%"></div>
        <div class="card-body">
            <p class="card-title"><span class="name">Name:- </span><a href=""></a><span class="ans-name">${el.name}</span></p>
            <p class="card-text"><span class="name">LinkedIn:- </span><a href="${el.linkedin}" class="ans">${el.linkedin}</a></p>
            <p class="card-text"><span class="name">Github:- </span><a href="${el.Github}" class="ans">${el.Github}</a></p>
            <p class="card-text"><span class="name">E-Mail:- </span><a href="${el.email}" class="ans">${el.email}</a></p>
        </div>
    </div>`
    }).join("");

}
//render admin details 
Fetch_admin();

countData();

async function countData() {
    try {
        let api_data = await fetch(
            `${url}/product`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // .headers.get( "X-Total-Count" )
        let data = await api_data.json();
        document.getElementById("totalApicount").innerText = data.product.length;

        // fetch appointment data length
        // document.getElementById("NewlyAdd").innerText = localStorage.getItem("count") || 0; 
        document.getElementById("TotalEdited").innerText = localStorage.getItem("editcount") || 0;
        document.getElementById("TotalDelete").innerText = localStorage.getItem("deletecount") || 0;


    } catch (error) {
        alert("Can't able to fetch Details of Admin");
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

document.getElementsByClassName("log_out")[0].addEventListener("click", async(e) => {
    e.preventDefault()
    try{
        let res=await fetch(`${url}/users/logout`,{
                    headers:{
                        "content-type":"application/json",
                        "authorization":token
                    }
                 })
                let data= await res.json()
                if(data.msg=="Logout Success"){
                     localStorage.clear("admin");
                    //  alert("logout succes")
                     Swal.fire(
                        'Good job!',
                        '<h3> Logout Successfully! See You Soon 👍</h3>',
                        'success'
                      ).then((res)=>{
                        window.location.href = "index.html"
                      })
                }
    }catch(err){
        console.log(err)
    }

});

}