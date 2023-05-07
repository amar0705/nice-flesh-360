const express = require('express');
const fetch = require('node-fetch');
require("dotenv").config()
const { ProductModel } = require('../models/Products.model');

const product = express.Router();

// Read the data using get request
product.get("/", async (req, res) => {
  try {
    let product = await ProductModel.find()
    // console.log(data)
    res.status(200).send({product})
  } catch (err) {
    return res.status(404).send(err.message);
  }
})

// for get only data with Type==Men
product.get("/men", async (req, res) => {
  try {
    let product = await ProductModel.aggregate([{ $match: { type: "Men" } }])
    // console.log(data)
    res.status(200).send(product)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})

// for get only data with Type==Women
product.get("/women", async (req, res) => {
  try {
    let product = await ProductModel.aggregate([{ $match: { type: "Women" } }])
    // console.log(data)
    res.status(200).send(product)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})

// for get only data with  "category": "Hair Kit"
product.get("/HairKit", async (req, res) => {
  try {
    let product = await ProductModel.aggregate([{ $match: {  category: "Hair Kit"} }])
    // console.log(data)
    res.status(200).send(product)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})

// for get only data with  "category": "Combo"
product.get("/Combo", async (req, res) => {
  try {
    let product = await ProductModel.aggregate([{ $match: {  category: "Combo"} }])
    // console.log(data)
    res.status(200).send(product)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})

// for get only data with  "category": "Hair"
product.get("/Hair", async (req, res) => {
  try {
    let product = await ProductModel.aggregate([{ $match: {  category: "Hair"} }])
    // console.log(data)
    res.status(200).send(product)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})

// for get only data with  "category": "MINIATURE"
product.get("/MINIATURE", async (req, res) => {
  try {
    let product = await ProductModel.aggregate([{ $match: {  category: "MINIATURE"} }])
    // console.log(data)
    res.status(200).send(product)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})


// for get only data with  "category": "Cream"
product.get("/Cream", async (req, res) => {
  try {
    let product = await ProductModel.aggregate([{ $match: {  category: "Cream"} }])
    // console.log(data)
    res.status(200).send(product)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})


// write/Add the data using post request
product.post("/", async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    return res.send({msg:"Product updated"});
  } catch (err) {
    return res.status(404).send(err.message);
  }
});


// update the data using put(require all)/Patch request
product.patch("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    return res.send(product);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

// delete the data using delete request
product.delete("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id, req.body)
    return res.send({msg:"Product deleted"});
  } catch (err) {
    return res.status(404).send(err.message);
  }
});


//----------------->>>>> Payment Method<<<<--------------

product.post("/orders",async(req,res)=>{
let amount=req.body.amount;
 let auth='Basic ' + Buffer.from(process.env.apiKey + ':' + process.env.apiSecret).toString('base64')
try{
  let resp= await fetch('https://api.razorpay.com/v1/orders',{
    method:"POST",
    headers: {
      'content-type':"application/json",
      'Authorization': auth	 
    },
    body:  JSON.stringify({
      "amount": amount*100,
      "currency": "INR",
      "receipt": "qwsaq1",
      "partial_payment": true,
      "first_payment_min_amount": 200
    })
  })
  let data= await resp.json()
  res.status(200).send(data)
}
catch(err){
  res.status(500).send({error: err})
}
    
})

module.exports = { product }