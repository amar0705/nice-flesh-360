const express=require("express")
const {StyleModel}=require("../models/style.model")

const styleRouter=express.Router()

styleRouter.use(express.json())


styleRouter.get("/",async(req,res)=>{
    const data=req.query
    try{
        const style=await StyleModel.find()
        console.log(style)
        res.send(style)
    }catch(err){
        console.log("err")
        console.log({"msg":"Something went wrong"})
    }
})

styleRouter.get("/male",async(req,res)=>{
    try{
    let data= await StyleModel.aggregate([{ $match: { Gender: "Male" } }])
    res.status(200).send(
        data
    )
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

styleRouter.get("/female",async(req,res)=>{
    try{
    let data= await StyleModel.aggregate([{ $match: { Gender: "Female" } }])
    res.status(200).send(
        data
    )
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

module.exports={
    styleRouter
}