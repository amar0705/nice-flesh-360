
const baseurl="https://elegant-hare-dungarees.cyclic.app"

const btn= document.getElementById("login")
 btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let name= document.getElementById("name").value
    let age= document.getElementById("age").value
    let gen= document.getElementById("signup-gen").value
    let email= document.getElementById("signup-email").value
    let password= document.getElementById("signup-pass").value
      // console.log(name,age)
    const payload = {
      name,age,gen,email,password

    };
    fetch(`${baseurl}/users/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
    .then((res)=>{
    if(res.msg=="register successfully"){
      // alert ("Register success")
  
      Swal.fire(
        'Good job!',
        '<h3> SalonLex - Register Successfully! Proceed to Login 👍</h3>',
        'success'
      ).then((res)=>{
        window.location.href = "login.html"
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'SalonLex - Already registered!',
        footer: '<a href="../Frontend/login.html">Log in</a>'
      })
      // alert ("Already registered")
    }
   } )
      .catch((err) => console.log(err))

 })
   

