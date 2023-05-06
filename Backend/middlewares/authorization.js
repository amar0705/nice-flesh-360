const jwt=require('jsonwebtoken');
const authenticate=(req,res,next)=>{
    const token=req.cookies.token
    if(token){
        jwt.verify(token,"hell",(err,decoded)=>{
            if(decoded){
                req.body.author=decoded.userid;
                next();
            }else{
                res.send({msg:"wrong token"})
            }
        })
    }else{
        res.send({msg:"Please login first"})
    }
}
module.exports={
    authenticate
}