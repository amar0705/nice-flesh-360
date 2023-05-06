
const baseurl="http://localhost:8080"

const btn= document.getElementById("login")
 btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let name= document.getElementById("name").value
      let age= document.getElementById("age").value
      let gen= document.getElementById("signup-gen").value
     let email= document.getElementById("signup-email").value
     let password= document.getElementById("signup-pass").value
      console.log(name)
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
      alert ("Register success")
      window.location.href = "login.html"
    }
    else {
      alert ("Already registered")
    }
   } )
      .catch((err) => console.log(err))

 })
   

