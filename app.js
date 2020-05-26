const express = require('express');
const bodyParser = require('body-parser');

const app=express();
const userController = require('./controller/userController');
const donorController = require('./controller/donorController');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");    //allows all url
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS")
    next();
});
app.use('/auth',userController);
 app.use('/donors',donorController);
app.get('/',(req,res,next)=>{
    res.status(200).json("Blood_Management");
})
module.exports=app;