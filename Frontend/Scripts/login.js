const baseurl="https://elegant-hare-dungarees.cyclic.app"
const butt=document.getElementById("log")
const admin=document.querySelector(".login-admin")

butt.addEventListener("click",(e)=>{
    e.preventDefault()

    let email=document.getElementById("email").value
    let password=document.getElementById("pass").value

    if(email=="" || password==""){
      return  Swal.fire(
        'warning!',
        '<h3> Please fill all details</h3>',
        'warning'
      ).then((res)=>{
        window.location.href = "login.html"
      })
    }

    const payload={
        email,password
    };
    fetch(`${baseurl}/users/login`,{
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
      Swal.fire(
        'Good job!',
        '<h3> Login Successfully! Enjoy 👍</h3>',
        'success'
      ).then((res)=>{
        window.location.href = "index.html"
      })
      // alert ("Login success")
      // window.location.href = "index.html"
    }
    else {
   Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Credentials!',
        footer: '<a href="../Frontend/login.html">Log in</a>'
      })

      // alert ("Wrong Credentials")
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
    Swal.fire(
        'Good job!',
        '<h3> SalonLex - Welcome to Admin Panel! 👍</h3>',
        'success'
      ).then((res)=>{
        window.location.href = "admin.html"
      })
    // window.location.href = "admin.html"
  }
  else {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'SalonLex - Wrong Credentials!',
        footer: '<a href="../Frontend/login.html">Log in</a>'
      })
    // alert ("Wrong Credentials")
  }
}
)
.catch((err) => console.log(err))

})