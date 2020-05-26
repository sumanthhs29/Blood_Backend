const express = require('express');
const donorSchema = require('../model/donorModel');   //import DB
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/blood');   //used to connect front-end

router.post('/donor',(req,res,next) =>{

    var donors=new donorSchema(req.body)
    donorSchema.findOne({phoneNO:req.body.phoneNO},function(err,result){
        if(err){
            res.status(500).json(err);

        }if(result === null){
    donors.save(function(err,result){
        console.log('result');

        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json({
                status:"success",
                data:result
            })
        }
    });
}else{
    if(err){
        res.status(500).json(err);
    }else{
        res.status(200).json({
            status:"already",
            data:result
        })
    }

}

});
});

router.post('/acceptor',(req,res,next) => {
    const bloodtype = req.body.blood;
    if((bloodtype === 'a+') || (bloodtype === 'a-') || (bloodtype === 'b-') || (bloodtype === 'b+')){
        donorSchema.find({ $or: [ { blood: bloodtype},{blood:'o+'},{blood:'o-'}  ] }  ,function(err,result){
            if(err){
                res.status(500).json(err);
    
            }else{
                if(result!=null){
                    res.status(200).json({
                        status:"success",
                        data:result
                    })
                }
                else{
                    console.log("sdasdasd");
                    //res.status(500).json(err);
                }
                }
        })

    }


     else if((bloodtype === 'ab+') || (bloodtype === 'ab-')){
        donorSchema.find({ $or: [ { blood: bloodtype},{blood:'a+'},{blood:'a-'},{blood:'b+'},{blood:'b-'},
        {blood:'o+'},{blood:'o-'}  ] }  ,function(err,result){
            if(err){
                res.status(500).json(err);
    
            }else{
                if(result!=null){
                    res.status(200).json({
                        status:"success",
                        data:result
                    })
                }
                else{
                    console.log("sdasdasd");
                    //res.status(500).json(err);
                }
                }
        })

    }


    
    if((bloodtype === 'o+')||(bloodtype === 'o-')){
        donorSchema.find({blood:bloodtype},function(err,result){
            if(err){
                res.status(500).json(err);
    
            }else{
                if(result!=null){
                    res.status(200).json({
                        status:"success",
                        data:result
                    })
                }
                else{
                    console.log("sdasdasd");
                    //res.status(500).json(err);
                }
                }
        })
    }
    

});

router.get('/',(req,res,next)=>{
    res.status(200).json("donor");
})
module.exports =router;