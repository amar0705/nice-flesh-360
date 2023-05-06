const mongoose=require("mongoose")

const userSchema =mongoose.Schema({
    name:String,
    age:Number,
    gender:String,
    email:String,
    password:String,
    
})

const userModel=mongoose.model("user",userSchema)
module.exports={ userModel}