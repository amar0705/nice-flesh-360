let baseurl = "https://elegant-hare-dungarees.cyclic.app";
const token = localStorage.getItem("token");
const stylearr = JSON.parse(localStorage.getItem("style"));
console.log(stylearr);
var stylistArea = document.getElementById("main-cont");
let arr;
let stylist;
fetchdata();

async function fetchdata() {
  try {
    let res = await fetch(`${baseurl}/stylist/male`);
    data = await res.json();
    arr = data;
    console.log(arr);
    getdata(arr);
  } catch (err) {
    console.log(err);
  }
}

function getdata(data) {
  stylistArea.innerHTML = "";
  stylistArea.innerHTML = `
${data
  .map((item) => {
    return getasCard(item);
  })
  .join(" ")}
`;
  booknow();
}

function getasCard(item) {
  return `
    <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${item.image_urls} alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${item.Stylists_name}</h5>
              <p class="card-text">${item.descriptions.substring(0, 60) + "..."}</p>
             <button data-id= ${
               item._id
             } class="btn btn-primary" style="color:black; background:white; border-color: transparent">Book Now</button>
            </div>
          </div>
    `;
}

function booknow() {
  let book = document.querySelectorAll(".btn");

  for (let btn of book) {
    btn.addEventListener("click", (e) => {
      getname(e.target.dataset.id);
      popup.classList.toggle("show");
    });
  }
}

let popup = document.querySelector(".popup");
let closed = document.querySelector(".close");

closed.onclick = () => {
  popup.classList.remove("show");
};

function getname(id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id == id) {
      stylist = arr[i];
      return;
    }
  }

  return;
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = document.getElementById("from-date").value;
  const time = document.getElementById("time").value;
  console.log(stylist);
  let obj = {
    date,
    time,
    styler_name: stylist.Stylists_name,
    stylist_id: stylist._id,
    style_name: stylearr.Name,
    style_id: stylearr._id,
  };
  fetch(`${baseurl}/appointment/new`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg == "wrong token" || data.msg == "Please login first") {
        alert("Please Login");
      } else {
        // alert("Booking confirmed");
        Swal.fire("Good job!", "<h3> Booking Confirmed! Enjoy 👍</h3>", "success").then((res) => {
          window.location.href = "index.html";
        });
      }
    })

    .catch((err) => {
      console.log(err);
    });
});
