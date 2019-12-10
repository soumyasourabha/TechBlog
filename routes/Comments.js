const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const verify = require('./VerifyToken');
const Post = require('../models/Posts');
const Comment = require('../models/Comments')

router.post('/:postid/',verify, async (req,res) => {
       
    const comment = new Comment({
        _id : new mongoose.Types.ObjectId,
        comment : req.body.comment,
        postid : req.params.postid,
        userid : req.user._id,
        created_at : Date.now()
    })
    try{
        const id = mongoose.Types.ObjectId(req.params.postid)
        const post = await Post.findById(id)      
        await comment.save()
        post.comments.push(comment)
        await post.save()
        const savedComment = await comment.save();
        res.status(200).send(savedComment)
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})


router.put('/:postid/:commentid',verify,async (req,res) => {
    try{
        const postid = await Post.findById({_id : req.params.postid}).select('_id')
        const updatedComment =  await Comment.updateOne({_id : req.params.commentid},{$set :
                {
                    commented_by : req.body.commented_by,
                    comment : req.body.comment,
                    updated_at : Date.now()
                }
            }).where('postId').equals(postid)
        
        res.status(200).send(updatedComment)
    }
    catch(error){
            res.status(400).send({Error : error})
    }
})


router.delete('/:postid/:commentid',verify, async (req,res) => {
    try{
        const postid = await Post.findById({_id : req.params.postid}).select('_id')
        const deletedComment =  await Comment.deleteOne({_id : req.params.commentid})
        .where('postid').equals(postid)

        res.status(200).send(deletedComment)
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})

module.exports = router;