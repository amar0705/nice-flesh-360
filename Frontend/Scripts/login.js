// const logFun=()=>{
//     const payload={
  
//         email:document.getElementById("email").value,
//         pass:document.getElementById("pass").value
//     }
//     fetch("http://localhost:8080/user/login",{
//         method:"POST",
//         headers:{
//             "Content-type":"application/json"
//         },
//         body:JSON.stringify(payload)
//     }).then(res=>res.json())
//     .then(res=>{
//         console.log(res)
//         localStorage.setItem("token",res.token)
//     })
//     .catch(err=>console.log(err))

// }
const baseurl="http://localhost:8080"
const butt=document.getElementById("log")
butt.addEventListener("click",(e)=>{
    e.preventDefault()

    let email=document.getElementById("email").value
    let pass=document.getElementById("pass").value

    const payload={
        email,pass
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
          console.log(res)
            localStorage.setItem("token",res.token)
alert ("Signup success")
}
)
  .catch((err) => console.log(err))

})