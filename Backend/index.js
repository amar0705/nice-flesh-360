const express=require('express');
const {connection}=require('./config/db')
const {stylist}=require('./routes/stylist.router')
const {product}=require('./routes/product.router')
const app = express();
app.use(express.json());
app.use("/product",product)
app.use("/stylist",stylist)









app.get('/', (req, res) => {
    res.send({msg:"Welcome!"});
})









app.listen(8080,async()=>{
await connection
console.log('listening on port 8080')
})