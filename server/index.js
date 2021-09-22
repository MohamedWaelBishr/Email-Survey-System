//dependencies
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
const express =require('express')
const app = express()
const mongoose = require("mongoose")
const user = require("./Models/User")
const survey = require("./Models/Survey")
const ConnectDB = require("./DBconnect")

ConnectDB()

//app methods
app.get("/",(req,res)=>{
    res.send({msg: "Hello World!"})
})


require('./Routes/SurveyRoute')(app);

//server port
const PORT= process.env.PORT

app.listen(PORT,()=>{
    `Successfully Started The Server Side On Port ${PORT}`,PORT
})
