const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
    fname: {type:String , required:true},
    lname: {type:String , required:true},
    blood: {type:String,required:true},
    phoneNO:{type:Number,required:true},
    age: {type:Number,required:true},
    adress: {type:String , required:true},
    createdOn:{type:Date,default:new Date()}
});

module.exports = mongoose.model("donors",donorSchema);