const mongoose = require("mongoose")
const {Schema } = mongoose

const RecipientsSchema = new Schema(
    {
        email:String,
        responded:{ type: Boolean, default: false }
    }
)
module.exports = RecipientsSchema
