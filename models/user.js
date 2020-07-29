const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png"
    },
    isloggedin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

mongoose.model("User",userSchema)