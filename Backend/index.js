const express=require('express');
const {connection}=require('./config/db')
const app = express();











app.get('/', (req, res) => {
    res.send({msg:"Welcome!"});
})









app.listen(8080,async()=>{
await connection
console.log('listening on port 8080')
})