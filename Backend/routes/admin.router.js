const express = require('express');
const { Adminmodel } = require('../models/admin.model');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { client } = require("../config/redisClient");
const admin = express.Router();

// Read the data using get request
admin.get("/", async (req, res) => {
  try {
    let admin = await Adminmodel.find()
    // console.log(data)
    res.status(200).send(admin)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})

// Admin Login Route

admin.post('/login', async(req, res) => {
  const email=req.body.email
  const pass=req.body.password
  try{
      const data=await Adminmodel.find({email})
      if(data.length>0 && data[0].pass==pass){
          // console.log(pass);
          // bcrypt.compare(pass,data[0].password,async(err, result)=> {
          //         if(err){
          //             res.status(400).send({message:err});
          //         }

          //    if(result){
          //     console.log(result);
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
              // else{
              //     res.send({msg:"wrong credentials"})  
              // }

          //  });
      
      else{
          res.send({msg:"wrong credentials"})  
      }
  }catch(err){
      console.log(err)
  }
  })

module.exports = { admin }