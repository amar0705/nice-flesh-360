const mongoose=require("mongoose");

const AdminSchema=mongoose.Schema({
    name:String,
    linkedin:String,
    Github:String,
    email:String,
    pass:String ,
    image:String,
})

const Adminmodel=mongoose.model("admin",AdminSchema);

module.exports={
    Adminmodel
}
