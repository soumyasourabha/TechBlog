const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : {type  : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    first_name : {type : String, required : true},
    last_name : {type : String, required : true},
    bio : {type : String, required : true},
    gender : {type : String, required : true},
    age : {type : Number, required : true},
    created_at : {type : mongoose.Schema.Types.Date},
    updated_at : {type : mongoose.Schema.Types.Date},
    posts : [{type : mongoose.Schema.Types.ObjectId, ref : 'Post'}],
})

module.exports = mongoose.model('User',userSchema);