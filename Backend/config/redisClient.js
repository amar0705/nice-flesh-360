const { createClient } =require('redis')

require("dotenv").config()

const client = createClient({
    url: process.env.redis
});

client.on('error', err => console.log('Redis Client Error', err));





module.exports={client}