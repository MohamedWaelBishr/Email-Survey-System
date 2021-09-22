//dependencies
const express =require('express')
const app = express()
const keys = require('./config/keys')
const mongoose = require("mongoose")
const user = require("./models/User")
const survey = require("./models/Survey")

mongoose.connect(keys.mongoURI).then(console.log("Successfully Connected to MongoDB"))


//app methods
app.get("/",(req,res)=>{
    res.send({msg: "Hello World!"})
})

//server port
const PORT= 5000

app.listen(5000,()=>{
    "Successfully Started The Server Side On Port 5000",PORT
})


//Mk6cSwwKpHLhxFvf