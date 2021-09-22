//dependencies
const express =require('express')

const mongoose=require('mongoose')
const app = express()
//app methods
app.get("/",(req,res)=>{
    res.send({msg: "Hello World!"})
})

//server port
const PORT= 5000

app.listen(5000,()=>{
    "Successfully Started The Server Side On Port 5000",PORT
})
mongoose.connect("mongodb+srv://everestmindServer:everestmind@cluster0.wsoav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(console.log("Successfully Connected to The Test Database"))
