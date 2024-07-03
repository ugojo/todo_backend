const mongoose = require("mongoose")



todoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    complete :{
        type: Boolean,
        required: true,
        default: false
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps : true})


module.exports = mongoose.model("Todo", todoSchema)