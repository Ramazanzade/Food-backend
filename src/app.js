const express=require('express')
const { CONNECTION_STRING}=require('./config/index')
const {mongoose}= require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();
const serverless = require("serverless-http");
const userrouter = require('./api/router/userrouter')
const fileupload = require('./api/router/filerouter')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)                                                     
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
app.options("*", cors({ origin: ["https://food-xml4.onrender.com"], optionsSuccessStatus: 200 }));
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use('/api/user', userrouter)
app.use('/api/file', fileupload)
app.use((err,res)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})




module.exports=app
module.exports.handler = serverless(app);











