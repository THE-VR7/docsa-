const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Postschema = mongoose.Schema({
    title:{
        type:String,
    required:true
    },
    body:{
        type:String,
    required:true
    },
    users:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    protected:{
        type:Boolean,
        default:false
    }
})

mongoose.model("Post",Postschema)