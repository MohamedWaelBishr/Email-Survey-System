//dependencies
const express =require('express')
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

