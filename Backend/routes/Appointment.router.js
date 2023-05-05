const express=require('express')
const appointment=express.Router()
const { AppointmentModel } = require("../models/Appointment.model");
const {authenticate} = require("../middlewares/authorization")



// --------->>>> GET <<<<<---------
appointment.get("/",async (req,res) =>{
    try {
        const data=await AppointmentModel.find();
        res.status(200).send(data);
    } catch (error) {
        console.log(error.message);
        res.status(404).send({Message:"Bad request 404! unable to fetch the data"});
    }
})


//--------->>>> GET ROUTE FOR USERS <<<<<---------
appointment.get("/users",authenticate,async (req,res) =>{
    let userid=req.body.author
    try {
        const data=await AppointmentModel.aggregate([{$match:{user_id:userid}}]);
        res.status(200).send(data);
    } catch (error) {
        console.log(error.message);
        res.status(404).send({Message:"Bad request 404! unable to fetch the data"});
    }
})

//------------->>>>>>>>  Get Appointments by stylists  <<<<<<<<------------
appointment.get("/stylist/:id",authenticate,async (req,res) =>{
    const id=req.params.id;
    try {
        const data=await AppointmentModel.find({stylist_id:id});
        res.status(200).send(data);
    } catch (error) {
        console.log(error.message);
        res.status(404).send({Message:"Bad request 404! unable to fetch the data"});
    }
})


// --------->>>> POST <<<<<---------
appointment.post("/new",authenticate,async (req,res)=>{
    const payload=req.body;
    const user_id=req.body.author;
    try {
        const appointmentData=new AppointmentModel({...payload,user_id:user_id});
        await appointmentData.save();
        res.status(200).send({Message:"Appointment created successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(404).send({Message:"Bad request 404! unable to create new appointment"});
    }
})

// --------->>>> PATCH <<<<<---------
appointment.patch("/:id",async (req,res)=>{
    const id=req.params.id;
    const payload=req.body;
    try {
        await AppointmentModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).send({Message:"Appointment updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(404).send({Message:"Bad request 404! unable to update the appointment"})
    }
})

// --------->>>> DELETE <<<<<---------
appointment.delete("/delete/:id",authenticate,async(req,res)=>{
    const id=req.params.id;
    try {
        await AppointmentModel.findByIdAndDelete({_id:id});
        res.status(200).send({Message:"Appointment deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(404).send({Message:"Bad request 404! unable to delete the appointment"})
    }
})




module.exports = { appointment}