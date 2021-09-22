//dependencies
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
const express =require('express');
const mongoose = require("mongoose")
const cookieSession=require('cookie-session')
const passport=require('passport')
const keys =require('./config/keys')
const user = require("./Models/User")
const survey = require("./Models/Survey")
const ConnectDB = require("./DBconnect")

////google oauth///

require('./service/passport')
ConnectDB()
const app = express()
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  );
app.use(passport.initialize());
app.use(passport.session());
  
require('./Routes/authRoute')(app);


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
