const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requirelogin = require('../middleware/requirelogin')
const Post = mongoose.model("Post")


router.get('/allpost',(req,res)=>{
    Post.find()
    .select("-users")
    .then(posts =>
        {
            res.json(posts)
        })
    .catch(err=>{
            console.log(err) 
        })
})

router.get('/post/:id',requirelogin,(req,res)=>{
    Post.findOne({_id:req.params.id})
    .populate("users","_id name email isloggedin pic updatedAt")
    .then(doc=>{        
        res.json(doc)
    }).catch(err=>{
        console.log("Post not found")
    })
})

router.post('/adddocument',(req,res)=>{
    const {title,body,users,protected} = req.body
    const doc = new Post({
        title,
        body,
        users,
        protected
    })
        doc.save()
            .then(user=>{
                console.log(user)
                res.json({message:"Saved Successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
})

router.put('/adduser',(req,res)=>{
    // console.log(req.body)
    const {documentid,userid} = req.body
    // console.log(documentid,userid)
    Post.findByIdAndUpdate(documentid,{
        $push:{users:userid}
    },{new:true})
    .populate("users","_id name email isloggedin pic updatedAt")
    .exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }else{
            // console.log(result)
            res.json(result) 
        }
    })
        
})



module.exports = router