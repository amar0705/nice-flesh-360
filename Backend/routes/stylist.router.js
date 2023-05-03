const express=require('express');
const {StylistModel}=require('../models/Stylists.model');
const stylist=express.Router();


stylist.get("/",async(req,res)=>{
    let data= await StylistModel.find()
    res.status(200).send(
        data
    )
})



module.exports ={stylist}