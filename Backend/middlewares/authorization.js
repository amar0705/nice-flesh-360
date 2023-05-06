const jwt=require('jsonwebtoken');
const {client} = require('../config/redisClient')
const authenticate=async(req,res,next)=>{
    const token=req.headers.authorization
    let blacklist=await client.sIsMember("blacklist",`${token}`)

   if(blacklist){
    res.send({msg:"Please login again"})
   }
   else{
    if(token){
        jwt.verify(token,process.env.mainseckey,(err,decoded)=>{
            if(err){
                res.send(err);
            }
            if(decoded){
                req.body.author=decoded.userid;
                next();
            }else{
                res.send({msg:"Please login first"})
            }
        })
    }else{
        res.send({msg:"Please login first"})
    }
}
}
module.exports={
    authenticate
}