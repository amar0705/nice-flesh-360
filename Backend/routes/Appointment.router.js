const express=require('express')
const appointment=express.Router()
const { AppointmentModel } = require("../models/Appointment.model");



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

// --------->>>> POST <<<<<---------
appointment.post("/new",async (req,res)=>{
    const payload=req.body;
    try {
        const appointmentData=new AppointmentModel(payload);
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
appointment.delete("/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        await AppointmentModel.findByIdAndDelete({_id:id});
        res.status(200).send({Message:"Appointment deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(404).send({Message:"Bad request 404! unable to delete the appointment"})
    }
})

module.exports = {  appointment}