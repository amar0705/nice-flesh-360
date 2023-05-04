const express=require('express');
const cors = require('cors')
const {connection}=require('./config/db')
const {stylist}=require('./routes/stylist.router')
const app = express();
app.use(express.json());
app.use(cors())
app.use("/stylist",stylist)



const {userRouter}=require("./routes/user.router")

const {authenticate}=require("./middlewares/authorization")


require("dotenv").config();

app.use(cors());






app.get('/', (req, res) => {
    res.send({msg:"Welcome!"});
})
app.use("/user",userRouter)
app.use(authenticate)









app.listen(8080,async()=>{
await connection
console.log('listening on port 8080')
})