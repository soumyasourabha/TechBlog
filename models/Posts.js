const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id : {type : mongoose.Schema.Types.ObjectId},
    title : {type  : String, required : true},
    description : {type  : String, required : true},
    likes : {type  : String, required : true},
    image_url : {type  : String, required : true},
    created_at : {type : mongoose.Schema.Types.Date},
    updated_at : {type : mongoose.Schema.Types.Date},
    userid : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    comments : [{type: mongoose.Schema.Types.ObjectId, ref : 'Comments'}],
})

module.exports = mongoose.model('Posts',postSchema);