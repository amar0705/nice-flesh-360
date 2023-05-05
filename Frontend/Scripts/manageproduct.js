let data = JSON.parse(localStorage.getItem("admin_data"));

document.querySelector("#admin_name").innerText = localStorage.getItem("admin_name")
// document.querySelector("#img_nav").setAttribute("src", data.usertype);

const url = `http://localhost:8080`;
let deleted = JSON.parse(localStorage.getItem("deleted")) || [];

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};

let globalData;
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
        globalData = data.product;
         console.log(data)
       displayCards(data.product);
    } catch (error) {
        alert("Can't able to fetch Details of Admin");
    }
}
Fetch_admin();

function displayCards(data) {
    // console.log("ok")
    //Render in the form of card
    data.map(function (ele) {
        let container = document.createElement("div");
        container.addEventListener("click", function () {
            localStorage.setItem("saveData", JSON.stringify(data));
        });
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

        let del = document.createElement("button");
        del.innerText = "Delete";
        del.classList = "delete";
    
        del.addEventListener("click",async ()=>{
            let productId = ele._id;
            console.log(productId)
            deleted.push(ele);
            localStorage.setItem("deleted",JSON.stringify(deleted));
            
            try {
                let api_data = await fetch(
                    `${url}/product/${productId}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
        
                if (api_data.ok) {
                    let data = await api_data.json();
                    window.location.href = "manageProduct.html";
                    displayCards(globalData);
                    c++;
                    localStorage.setItem("deletecount", c);
                } else {
                    console.log("not editing data");
                }
            } catch (error) {
                alert(error);
            }
        });

        container.append(img, name_div, category, rating_div, mrp_price, price,del);
        document.querySelector(".sales-details").append(container)
    });

}

let updatedButton = document.getElementById("addBtn");

updatedButton.addEventListener("click", editProduct);
let c = localStorage.getItem("editcount") || 0;

//update the data
async function editProduct() {
 
     let     productId=document.getElementById("addId").value;
     let     title=document.querySelector("#prd_title").value;
     let     img=document.querySelector("#prd_img").value;
     let     price=document.querySelector("#acutal_price").value;
     let   mrp_price=document.querySelector("#mrp_price").value;
     let   discount=document.querySelector("#dis_perc").value;
     let   rating=document.querySelector("#rating").value;
     let   category=document.querySelector("#category").value;
      
 
    try {
    //    data = JSON.stringify(data)
    //    let id =document.getElementById('addId').value

        let api_data = await fetch(
            `${url}/product/${productId}`,
            {
                method: "PATCH",
                // body:data,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    img,price,mrp_price,discount,rating,category
                
                }),
            }
        );
        // console.log(api_data);

        if (api_data.ok) {
            let res = await api_data.json();
            console.log(res);
            c++;
            localStorage.setItem("editcount", c);
            alert("Product Edited");
            window.location.href = "manageProduct.html"
        } else {
            console.log("not editing data");
        }
    } catch (error) {
        alert(error);
    }

}
editProduct();

// userDetailss();
// function userDetailss() {
//     let admin = JSON.parse(localStorage.getItem("admin"));
//     let cont = document.getElementById("admin_name");
//     let cont2 = document.getElementById("img-admin");
    
//     cont2.innerHTML = `<img src="${admin.image}">`
//     cont.innerHTML = `${admin.name}`
// };

// document.getElementsByClassName("log_out")[0].addEventListener("click",()=>{
//     localStorage.clear("admin-signed");
//     localStorage.clear("admin");
// });