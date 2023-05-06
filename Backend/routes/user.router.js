const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const  {userModel} = require("../models/user.model");
const { client } = require("../config/redisClient");



const userRouter = express.Router();


userRouter.post("/signup",async(req,res)=>{
   
    const {name,email,password,age,gender}=req.body
    try {

        const user=await userModel.findOne({email:email})
        if(user){
             res.status(200).send({msg:"you are alredy registered"})
         }else{
             bcrypt.hash(password,5,async(err,hash)=>{
                 const main = new userModel({
                    name,
                    email,
                     password:hash,
                     age,
                     gender
             })
                await main.save();
                res.status(200).send({msg:"register successfully"})
             });
         }
     } 
    
    catch (error) {
        console.log(error)
        res.status(401).send("bad requst")
    }
})

//////////log in ///////////

userRouter.post('/login', async(req, res) => {
    const email=req.body.email
    const password=req.body.password
    try{
        const data=await userModel.find({email})
        if(data.length>0){
            console.log(password);
            bcrypt.compare(password,data[0].password,async(err, result)=> {
                    if(err){
                        res.status(400).send({message:err});
                    }

               if(result){
                console.log(result);
                    var token= jwt.sign({email:email}, process.env.mainseckey, {
                        expiresIn: '1h',
                     });
                     var refreshToken= jwt.sign({email:email}, process.env.mainseckey, {
                        expiresIn: '10h',
                     });

                     await client.set("refreshToken",refreshToken,{
                        EX:1800
                     })
                     
                     res.status(200).send({ msg: "Login Successful",token,refreshToken})
                    
                }
                else{
                    res.send({msg:"wrong credentials"})  
                }

             });
        }
        else{
            res.send({msg:"wrong credentials"})  
        }
    }catch(err){
        console.log(err)
    }
    })
//////////log out ///////////

userRouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization
    let refresh=await client.get("refresh")
    await client.sAdd("blacklist",`${token}`)
    await client.sAdd("blacklist",`${refresh}`)
    
       res.send({msg:"Logout Success"})
})
//////////Get new token////////

userRouter.get("/getnewtoken",async(req,res)=>{
    var reftoken=req.headers.authorization
    if(!reftoken){
        res.status(200).send("login again")

    }else{
        jwt.verify(reftoken, process.env.refseckey,async(error,decoded)=>{
            if(error){
                console.log(error);
                res.status(200).send("login again")
            }else if(decoded){
                let user=decoded
                var maintoken = jwt.sign({userID:user.userID,userrole:user.userrole}, process.env.mainseckey,{expiresIn:60});
                res.send (200).send({"message":"user login succesfully",maintoken:maintoken}) 
            }else{
                console.log("error");
                res.status(200).send("login again")
            }
        });
    }
})




module.exports={userRouter}