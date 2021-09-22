//dependencies
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
const express =require('express')
const app = express()
const mongoose = require("mongoose")
const user = require("./models/User")
const survey = require("./models/Survey")
const ConnectDB = require("./DBconnect")

ConnectDB()

//app methods
app.get("/",(req,res)=>{
    res.send({msg: "Hello World!"})
})

//server port
const PORT= 5000

app.listen(5000,()=>{
    "Successfully Started The Server Side On Port 5000",PORT
})
