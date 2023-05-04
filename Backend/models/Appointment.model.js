const mongoose =require("mongoose");

const AppointmentSchema=mongoose.Schema({
    stylist_id:String,
    user_id:String,
    style_id:String,
    date:String,
    time:String,
    style_name:String,
    styler_name:String,
    status:{type:String,default:"Confirmed",
    enum:["Confirmed","Cancelled"]
}
})

const AppointmentModel=mongoose.model('appointment',AppointmentSchema);

module.exports={
    AppointmentModel
}