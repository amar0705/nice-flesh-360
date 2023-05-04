const mongoose=require("mongoose")

const styleSchema=mongoose.Schema({
    Name:String,
    Image:String,
    Price:Number,
    Gender:String
},{
    versionKey:false
})
const StyleModel=mongoose.model("style",styleSchema)

module.exports={
    StyleModel
}