
const baseurl="http://localhost:8080"

const btn= document.getElementById("login")
 btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let name= document.getElementById("name").value
      let age= document.getElementById("age").value
      let gen= document.getElementById("gen").value
     let email= document.getElementById("email").value
     let pass= document.getElementById("pass").value
      let role=document.getElementById("role").value
    //   console.log(name)
    const payload = {
      name,age,gen,email,pass

    };
    fetch(`${baseurl}/users/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
    .then((data)=>
    alert ("Signup success")
    )
      .catch((err) => console.log(err))

 })
   

