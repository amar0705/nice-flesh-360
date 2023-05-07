
const baseurl="http://localhost:8080"
const butt=document.getElementById("log")
const admin=document.querySelector(".login-admin")

butt.addEventListener("click",(e)=>{
    e.preventDefault()

    let email=document.getElementById("email").value
    let password=document.getElementById("pass").value

    const payload={
        email,password
    };
    fetch(`${baseurl}/user/login`,{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify(payload),
})
.then((res) => res.json())
.then(res=>{
    if(res.msg=="Login Successful"){
      localStorage.setItem("token",res.token)
      alert ("Login success")
      window.location.href = "index.html"
    }
    else {
      alert ("Wrong Credentials")
    }
}
)
  .catch((err) => console.log(err))

})


admin.addEventListener("click",(e)=>{
  e.preventDefault()

  let email=document.getElementById("email").value
  let password=document.getElementById("pass").value

  const payload={
      email,password
  };
  fetch(`${baseurl}/admin/login`,{
  method:"POST",
  headers:{
      "Content-type":"application/json"
  },
  body:JSON.stringify(payload),
})
.then((res) => res.json())
.then(res=>{
  if(res.msg=="Login Successful"){
    localStorage.setItem("admin",res.token)
    localStorage.setItem("adminData",JSON.stringify(res.data))
    console.log(res.data)
    // alert ("Login success")
    window.location.href = "admin.html"
  }
  else {
    alert ("Wrong Credentials")
  }
}
)
.catch((err) => console.log(err))

})