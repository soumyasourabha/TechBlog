const mongoose =  require('mongoose');

const commentSchema = new mongoose.Schema({
    _id : {type : mongoose.Schema.Types.ObjectId},
    comment : {type : String, required : true},
    created_at : {type : mongoose.Schema.Types.Date},
    updated_at : {type : mongoose.Schema.Types.Date},
    userid : {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
    postid : {type: mongoose.Schema.Types.ObjectId, ref : 'Posts'}
})

module.exports = mongoose.model('Comments',commentSchema)