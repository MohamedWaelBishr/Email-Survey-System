//dependencies
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
const express =require('express')
<<<<<<< HEAD
=======
const app = express()
const mongoose = require("mongoose")
const user = require("./Models/User")
const survey = require("./Models/Survey")
const ConnectDB = require("./DBconnect")

ConnectDB()
>>>>>>> 869e117e04cfd9bafb11d1667d01e6fa321bd5b1

const mongoose=require('mongoose')
const app = express()
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
<<<<<<< HEAD
mongoose.connect("mongodb+srv://everestmindServer:everestmind@cluster0.wsoav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(console.log("Successfully Connected to The Test Database"))
=======
>>>>>>> 869e117e04cfd9bafb11d1667d01e6fa321bd5b1
