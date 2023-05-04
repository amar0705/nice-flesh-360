const express=require('express');
const cors = require('cors')
const {connection}=require('./config/db')
const {stylist}=require('./routes/stylist.router')
const {product}= require('./routes/product.router')
const {userRouter}=require("./routes/user.router")
const {appointment}=require('./routes/Appointment.router')
const {authenticate}=require("./middlewares/authorization")
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors())
app.use("/stylist",stylist)
app.use("/appointment",appointment)
app.use("/product",product)
app.use("/user",userRouter)






app.get('/', (req, res) => {
    res.send({msg:"Welcome!"});
})









app.listen(8080,async()=>{
await connection
console.log('listening on port 8080')
})