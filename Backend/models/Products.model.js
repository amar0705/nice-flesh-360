const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title:String,
    img:String,
    price:Number,
    mrp_price:Number,
    description:String,
    discount:Number,
    category:String,
    rating:Number,
    type:String,
})

const ProductModel = mongoose.model("product",ProductSchema)

module.exports ={ProductModel}