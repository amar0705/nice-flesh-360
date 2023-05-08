const url = `http://localhost:8080`;

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

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};

//fetch data of product(get from DB)
let productData;
let admin_details = document.querySelector(".sales-details");
async function Fetch_admin() {
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
        let data = await api_data.json();
        // console.log(data);
        productData = data.product;
        displayCards(data.product);
    } catch (error) {
        alert("Can't able to fetch Details of Admin");
    }
}
Fetch_admin();

function displayCards(data) {
    //Render in the form of card
    data.map(function (ele) {
        let container = document.createElement("div");
        // on click on product cardi t basically store in ls with key savedata
        // container.addEventListener("click", function () {
        //     // localStorage.setItem("saveData", JSON.stringify(data));
        // });
        //image 
        let img = document.createElement("img")
        img.setAttribute("src", ele.img);
        img.setAttribute("class", "proClass")

        //title
        let name_div = document.createElement("div")
        name_div.setAttribute("class", "name_pro_div");
        let title = document.createElement("h2");
        title.textContent = ele.title;
        name_div.append(title)
        title.setAttribute("class", "proname");


        //category
        let category = document.createElement("p");
        category.textContent = ele.category;
        category.setAttribute("class", "quantity");

        let rating_div = document.createElement("div");
        rating_div.setAttribute("class", "div5")
        let rating = document.createElement("p");
        rating.textContent = `${ele.rating}★`;

        rating.setAttribute("class", "rating");
        rating_div.append(rating);

        let mrp_price = document.createElement("p");
        let span2 = document.createElement("span");
        span2.textContent = `MRP ₹${ele.mrp_price}`;
        span2.setAttribute("class", "mrp");

        let span = document.createElement("span");
        span.innerText = `${ele.discount}%off`;
        mrp_price.append(span2, span);

        span.setAttribute("class", "dis");

        let price = document.createElement("p");
        price.textContent = "₹" + ele.price;
        price.setAttribute("class", "price")


        container.append(img, name_div, category, rating_div, mrp_price, price);
        document.querySelector("#all_products").append(container)
    });
}

    //postrequest
    // let c = localStorage.getItem("count") || 0;
    async function productpost(){
       
        try{
          let prd_body={
  
            title:document.querySelector("#prd_title").value,
            img:document.querySelector("#prd_img").value,
            price:document.querySelector("#acutal_price").value,
            mrp_price:document.querySelector("#mrp_price").value,
            discount:document.querySelector("#dis_perc").value,
            rating:document.querySelector("#rating").value,
            category:document.querySelector("#category").value,
          
       }
            let res = await fetch(`${url}/product`,{
                method:"POST",
                body:JSON.stringify(prd_body),
                headers:{"Content-type":"application/json"}
            });
            let data = await res.json();
            console.log(data);
            // localStorage.setItem("count", c);

            //swal will return a promise
            Swal.fire(
                'Good job!',
                '<h3>SalonLex - New Product Added successfully👍</h3>',
                'success'
              )
            
        }catch(err){
            console.log(err);
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
                        //    alert("logout succes")
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