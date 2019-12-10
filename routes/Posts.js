const express = require('express');
const Post = require('../models/Posts');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const verify = require('./VerifyToken');
const Comment = require('../models/Comments')

router.post('/post',verify, async (req,res) => {
    
    const post = new Post({
        _id : new mongoose.Types.ObjectId,
        title : req.body.title,
        description :req.body.description,
        likes : req.body.likes,
        image_url :req.body.image_url,
        userid : req.user._id, 
        created_at : Date.now()
    })
    try{
        const id  = mongoose.Types.ObjectId(req.user._id)
        const currentUser = await User.findById(id)
        const savedPost = await post.save();
        currentUser.posts.push(post)
        await currentUser.save()
        res.status(200).send(savedPost)
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})

router.get('/post',verify, async (req,res) => {
  
    try{
            const fetchPosts = await Post.find().populate('comments','comment');
            res.status(200).send(fetchPosts);
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})

router.get('/post/:postid',verify, async (req,res) => {
    try{
        const fetchPost = await Post.findById({_id : req.params.postid}).populate('comments','comment');
        res.status(200).send(fetchPost);
    }
    catch(error){
        res.send(400).send({Error : error})
    }
})

router.put('/post/:postid',verify,async (req,res) => {
    try{
        const updatePost = await Post.updateOne({_id : req.params.postid},
            {$set : {
                title : req.body.title,
                description :req.body.description,
                likes :req.body.likes,
                image_url :req.body.image_url,
                userid : req.user._id,
                updated_at : Date.now()
            }})
        res.status(200).send(updatePost)
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})

router.delete('/post/:postid',verify,async (req,res) => {
    try{
        const deletedPost = await Post.deleteOne({_id : req.params.postid});
        res.status(200).send(deletedPost)
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})

module.exports = router