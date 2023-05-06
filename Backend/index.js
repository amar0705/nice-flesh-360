const express=require('express');
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())
require("dotenv").config();

const {connection}=require('./config/db')
const {stylist}=require('./routes/stylist.router')
const {product}= require('./routes/product.router')
const {authenticate}=require("./middlewares/authorization")
const {authorise}=require("./middlewares/authorise")
const {userRouter}=require("./routes/user.router")
const {appointment}=require('./routes/Appointment.router')
const {styleRouter} =require('./routes/style.router')
const {admin} =require('./routes/admin.router')


app.use("/admin",admin)
app.use("/stylist",stylist)
app.use("/appointment",appointment)
app.use("/product",product)
app.use("/users",userRouter)
app.use("style",styleRouter)












app.get('/', (req, res) => {
    res.send({msg:"Welcome!"});
})









app.listen(8080,async()=>{
await connection
console.log('listening on port 8080')
})