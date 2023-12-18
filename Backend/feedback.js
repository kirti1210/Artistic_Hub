const mongoose=require('mongoose');

const FeedbackSchema=mongoose.Schema({
    username:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }});

module.exports=mongoose.model('feedback',FeedbackSchema);