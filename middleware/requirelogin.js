const mongoose = require('mongoose')
const { json } = require('express')
const User = mongoose.model("User")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    // console.log(authorization)

    if(!authorization)
    {
        return res.status(401).json({error:"you must be logged in "})
    }
        // const {_id} = payload
        user = JSON.parse(authorization).user
        // console.log("user is ",req.user)
        User.findById(user._id).then(userdata=>{
            req.user = userdata;
            console.log("user is ",req.user)
            next();
        })
    
}