const express=require('express');
const {ProductModel}=require('../models/Products.model');

const product=express.Router();


product.get("/",async(req,res)=>{
    let data= await ProductModel.find()
    console.log(data)
    res.status(200).send(
        data
    
    )
})



module.exports ={product}