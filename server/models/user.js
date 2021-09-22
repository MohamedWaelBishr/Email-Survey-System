const mongoose=require('mongoose');

const user=mongoose.Schema({
    google_id:{ type:String, required:true},
    credit:{type:Number,default:0}
})

module.exports=mongoose.model('user',user);