const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type:String , required:true},
    emailID: {type:String,required:true},
    phoneNO:{type:Number,required:true},
    password: {type:String,required:true},
    createdOn:{type:Date,default:new Date()}
});

module.exports = mongoose.model("users",userSchema);