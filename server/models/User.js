const mongoose = require("mongoose")
const {Schema } = mongoose

const user = new Schema(
    {
        googleID:String,
        credits:{ type: Number, default: 0 }
    }
)

module.exports = mongoose.model('user',user)