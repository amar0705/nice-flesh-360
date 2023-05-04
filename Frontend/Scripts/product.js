
const baseUrl ="http://localhost:8080";
 ///api fetch
 mainFunction();

async function mainFunction() {
  try {

    let res = await fetch(`${baseUrl}/product`);

    let data = await res.json();
     //console.log(data)

     displayProduct(data);
     
     let WomenData = await fetch(`${baseUrl}/product/women`);

     let Women = await WomenData.json();
    
     let MenData = await fetch(`${baseUrl}/product/men`);

     let Men = await MenData.json();

     let HairKitData = await fetch(`${baseUrl}/product/HairKit`);

     let HairKit = await HairKitData.json();

     let ComboData = await fetch(`${baseUrl}/product/Combo`);

     let Combo = await ComboData.json();

     let HairData = await fetch(`${baseUrl}/product/Hair`);

     let Hair = await HairData.json();

     let MINIATUREData = await fetch(`${baseUrl}/product/MINIATURE`);

     let MINIATURE = await MINIATUREData.json();

     let CreamData = await fetch(`${baseUrl}/product/Cream`);

     let Cream = await CreamData.json();

//Filter by category and type
     document.querySelector(".WomenSort").addEventListener("click", function () {
      sort_by_women(Women);
            
     })

     document.querySelector(".MenSort").addEventListener("click", function () {
      sort_by_men(Men);
            
     })

     document.querySelector(".HairKit").addEventListener("click", function () {
      filter_by_HairKit(HairKit);
            
     })

     document.querySelector(".Combo").addEventListener("click", function () {
      sort_by_men(Combo);
            
     })

     document.querySelector(".Hair").addEventListener("click", function () {
      sort_by_women(Hair);
            
     })

     document.querySelector(".MINIATURE").addEventListener("click", function () {
      sort_by_men(MINIATURE);
            
     })

      document.querySelector(".Cream").addEventListener("click", function () {
      sort_by_men(Cream);
            
     })
///sorting
     document.querySelector(".dis_low").addEventListener("click", function () {
       sort_dis_price(data);
       
      })
      
      document.querySelector(".dis_high").addEventListener("click", function () {
        sort_dis_high(data);
        
      })
      
      document.querySelector(".low").addEventListener("click", function () {
        sort_price(data);
      
      })
  
      document.querySelector(".high").addEventListener("click", function () {
        sort_price_high(data);
      
      })
    document.querySelector(".rating_low").addEventListener("click", function () {
      sort_rating(data);
    
    })

    document.querySelector(".rating_high").addEventListener("click", function () {
      sort_rating_high(data);
    
    })
  }
  catch (error) {
    console.log("err:", error);
  }
}

function displayProduct(data) {
//Render in the form of card
  data.map(function (ele) {
    let container = document.createElement("div");
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
    rating.textContent = `${ele.rating} ★`;

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

    document.querySelector("#all_products").append(container);

//store details for new page
    let data_send = {
      img: ele.img,
      name_div: ele.title,
      description: ele.description,
      rating_div: ele.rating,
      mrp_price: ele.mrp_price,
      discount: ele.discount,
      price: ele.price,
      category: ele.category,
      type: ele.type,
     

    }
    // console.log(data_send)
  //   container.onclick = () => {
  //     showproduct(data_send)
  //   }

  });
}
//redirect to next  page
// function showproduct(data) {
//   localStorage.setItem('saveData', JSON.stringify(data));
//   window.location.href = "/"
// }

// WoMen category
function sort_by_women(Women){
  document.querySelector("#all_products").innerHTML = null
 
  displayProduct(Women);
}

// Men category
function sort_by_men(men){
  document.querySelector("#all_products").innerHTML = null
 
  displayProduct(men);
}

// filter_by_HairKit
function filter_by_HairKit(HairKit){
  document.querySelector("#all_products").innerHTML = null
 
  displayProduct(HairKit);
}

// filter_by_Combo
function filter_by_Combo(Combo){
  document.querySelector("#all_products").innerHTML = null
 
  displayProduct(Combo);
}

// filter_by_Hair
function filter_by_Hair(Hair){
  document.querySelector("#all_products").innerHTML = null
 
  displayProduct(Hair);
}

// filter_by_MINIATURE
function filter_by_MINIATURE(MINIATURE){
  document.querySelector("#all_products").innerHTML = null
 
  displayProduct(MINIATURE);
}

// filter_by_Cream
function filter_by_Cream(Cream){
  document.querySelector("#all_products").innerHTML = null
 
  displayProduct(Cream);
}

//  filter low to high price
function sort_price(data) {
  document.querySelector("#all_products").innerHTML = null
  data.sort(function (a, b) {
    console.log(a.price)
    return Number(a.price) - Number(b.price);
     
  })
  displayProduct(data);
}

//filter high to low price
function sort_price_high(data) {
  document.querySelector("#all_products").innerHTML = null
  data.sort(function (a, b) {
    return Number(b.price) - Number(a.price);
    //  console.log(a.price)
  })
  displayProduct(data);
}

//  filter low to bhigh discount
function sort_dis_price(data) {
  document.querySelector("#all_products").innerHTML = null
  data.sort(function (a, b) {
    return Number(a.discount) - Number(b.discount);
    //  console.log(a.price)
  })
  displayProduct(data);
}
//filter high to low discount
function sort_dis_high(data) {
  document.querySelector("#all_products").innerHTML = null
  data.sort(function (a, b) {
    return Number(b.discount) - Number(a.discount);
    //  console.log(a.price)
  })
  displayProduct(data);
}

//  filter low to high rating
function sort_rating(data) {
  document.querySelector("#all_products").innerHTML = null
  data.sort(function (a, b) {
    console.log(a.rating)
    return Number(a.rating) - Number(b.rating);
    //  
  })
  displayProduct(data);
}
//filter high to low rating
function sort_rating_high(data) {
  document.querySelector("#all_products").innerHTML = null
  data.sort(function (a, b) {
    return Number(b.rating) - Number(a.rating);
    //  console.log(a.price)
  })
  displayProduct(data);
} 

