const mongoose=require('mongoose');

const user=mongoose.Schema({
    email:{ type:String, required:true},
    responded:{type:String}
})

module.exports=mongoose.model('reciepient',reciepient);