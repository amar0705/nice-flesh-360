const mongoose = require('mongoose')



const StylistSchema=mongoose.Schema({
    image_urls:String,
    
Stylists_name:String,

descriptions:String,

Styler:String,


})


const StylistModel=mongoose.model("stylist",StylistSchema)



module.exports ={StylistModel}