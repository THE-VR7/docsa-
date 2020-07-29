const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const requirelogin = require('../middleware/requirelogin')



router.get('/',(req,res)=>{
    res.send("Hello")
})

router.post('/signup',(req,res)=>{
    console.log("reached server signup fucntion")
    const {name,email,password,pic} = req.body
    if(!email || !password || !name)
    {
       return res.status(422).json({error:"Please enter all the fields"})
    }
    User.findOne({email:email})
    .then((saved)=>{
        if(saved)
        {
            return res.status(422).json({error:"User already exist with the same email"})
        }

        bcrypt.hash(password,12)
        .then(hashedpass=>{
            const user = new User({
                name,
                email,
                password:hashedpass,
                pic:pic
            })
    
            user.save()
            .then(user=>{
                console.log(user)
                res.json({message:"Saved Successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })


})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
    {
       return res.status(422).json({error:"Please enter all the fields"})
    }
    User.findOne({email:email})
    .then((saved)=>{
        if(!saved)
        {
            return res.status(422).json({error:"Invalid email or password"})
        }

        bcrypt.compare(password,saved.password)
        .then(matched=>{
            if(matched)
            {
                // console.log("found user")
                // console.log("matched is ",saved)
                // res.json({message:"Signin Successfully"})
                User.findOneAndUpdate({email:saved.email},{isloggedin : true})
                .then((saved)=>{
                    console.log(saved)
                    const {_id,name,email,pic,isloggedin,updatedAt} = saved
                    res.json({user:{_id,name,email,pic,isloggedin,updatedAt}})    
                })
            }
            else
            {
                return res.status(422).json({error:"Invalid email or password"}) 
            }
            })
        .catch(err=>{
            console.log(err)
        })
    })    
})

router.post('/logout',(req,res)=>{
    const {email} = req.user;
    const {id} = req.body
    console.log("in the main logout funciton")
    console.log("req.user is ",req.user)
    User.findOneAndUpdate({_id:id},{isloggedin:false})
    .then((saved)=>{
        if(!saved)
        {
            return res.status(422).json({error:"Invalid email or password"})
        }
        console.log(saved)
        res.json(saved)
    })
    .catch(err=>{
        console.log(err)
    })  
})
    
 

module.exports = router