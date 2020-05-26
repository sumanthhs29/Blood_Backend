const express = require('express');
const userSchema = require('../model/userModel');   //import DB
const bodyParser = require('body-parser');
const bcrypt =require('bcrypt');
const saltRounds=10;

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blood');   //used to connect front-end

router.post('/signup',(req,res,next) =>{
    var hash =bcrypt.hashSync(req.body.password,saltRounds)

    var userJson={
        name:req.body.name,
        emailID:req.body.emailID,
        password:hash,
        phoneNO:req.body.phoneNO

    }
    var users=new userSchema(userJson);
    users.save(function(err,result){
        console.log('result');

        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json({
                status:"success",
                data:result
            })
        }
    })
});

router.post('/login',(req,res,next) => {

    userSchema.findOne({phoneNO:req.body.phoneNO},function(err,result){
        console.log('phone',req.body.phoneNO);
        if(err){
            res.status(500).json(err);

        } if(result!=null){
            console.log("result",result);
            if(bcrypt.compareSync(req.body.password,result["password"])){
                res.status(200).json({
                    status:"success",
                    data:result
                })
            }
        }else{
            console.log('not found');
            res.status(200).json({
                status:"failure",
                data:null
            })
        }
    })
});

router.post('/checksignin',(req,res,next) => {

    userSchema.findOne({phoneNO:req.body.phoneNO},function(err,result){
        console.log('phone',req.body.phoneNO);
        if(err){
            res.status(500).json(err);

        } if(result === null){
            console.log("result",result);
            res.status(200).json({
                status:"notfound",
                data:result
            })
        }else{
           // console.log('not found');
            res.status(200).json({
                status:"found",
                data:result   
            })
        }
    })
});

router.get('/',(req,res,next)=>{
    res.status(200).json("auth");
})
module.exports =router;