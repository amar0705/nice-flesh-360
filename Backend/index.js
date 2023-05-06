const express=require('express');
const cors = require('cors')
require("dotenv").config();
const {connection}=require('./config/db')
const {stylist}=require('./routes/stylist.router')
const {product}= require('./routes/product.router')
const {userRouter}=require("./routes/user.router")
const {appointment}=require('./routes/Appointment.router')
const {styleRouter} =require('./routes/style.router')
const {admin} =require('./routes/admin.router')
const {client} =require('./config/redisClient')
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}))

app.use("/admin",admin)
app.use("/stylist",stylist)
app.use("/appointment",appointment)
app.use("/product",product)

app.use("/users",userRouter)
app.use("style",styleRouter)

app.use("/user",userRouter)
app.use("/style",styleRouter)













app.get('/', async(req, res) => {
    res.send({msg:"Welcome!"});

})









app.listen(8080,async()=>{
    try{
        await connection
        await client.connect();
        console.log('listening on port 8080')
    }
    catch(err){
        console.log(err);
    }
})