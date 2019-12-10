const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose')
const {signupValidation , loginValidation } = require('./Validation');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken')
const verify = require('./VerifyToken');


router.post('/signup', async (req,res) => {

        //validation
        const {error} = signupValidation(req.body)
        if (error) 
            return res.send(error.details[0].message);
        
        //check for exist user
        const emailExist = await User.findOne({email : req.body.email});
        if(emailExist)
            return res.status(409).send('Email is already exists')

        //Password hashing using bcrypt
        const salt = await bcrypt.genSalt(7);
        const hashPassword = await bcrypt.hash(req.body.password,salt)

        //crete user
        const user = new User({
            _id : new mongoose.Types.ObjectId(),
            username : req.body.username,
            email : req.body.email,
            password : hashPassword,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            age : req.body.age,
            gender : req.body.gender,
            bio : req.body.bio,
            created_at : Date.now()
        })
        try{
            const savedUser = await user.save();
            res.status(200).send(savedUser)
        }
        catch(error){
            res.status(400).send({Error : error})
        }
})


router.post('/login', async (req,res) => {
        
    //login validation 
    const {error} = loginValidation(req.body);
    if(error) 
        return res.send(error.details[0].message);
        
        //check valid Email or not
        const user = await User.findOne({email : req.body.email});
        if(!user) 
            return res.status(422).send('Invalid email, please enter a correct one')
        
        //check valid password or not
        const isPassCorrect = await bcrypt.compare(req.body.password, user.password) 
        if(!isPassCorrect) 
            return res.status(422).send('you entered a wrong password!')
    

    const token = Jwt.sign({_id : user._id},process.env.TOKEN_SECRET); 
    res.header('user-token',token).send(`welcome ${user.username} ${token}`)   
})


router.get('/:userid',verify, async(req,res) => {
    try{
        const currentUser = await User.findById({_id : req.params.userid},['username','email','first_name','last_name','age','gender','bio','created_at'])
        res.status(200).send(currentUser)
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})

router.put('/:userid',verify, async(req,res) => 
{
    try{ 
        const updatedUser = await User.updateOne({_id : req.params.userid},{$set :
        {
            username : req.body.username,
            email : req.body.email,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            age : req.body.age,
            gender : req.body.gender,
            bio : req.body.bio,
            updated_at : Date.now()
        }
    
        })
        res.status(200).send(updatedUser)
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})


router.put('/:userid/forget',verify, async(req,res) => {
    try{
        const salt = await bcrypt.genSalt(7);
        const hashPassword = await bcrypt.hash(req.body.password,salt)
        
        await User.updateOne({_id : req.params.userid},{$set :
            {
                password : hashPassword
            }
        })
        res.status(200).send('password changed successfully.')
    }
    catch(error){
        res.status(400).send({Error : error})
    }
})

router.delete('/:userid',verify, async (req,res) => {
    try{
        const deletedUser = await User.findById({_id : req.params.userid});
        res.status(200).send(deletedUser)
    }
    catch(error){
        res.status(400).send({Error : error})
    }

})

module.exports = router;