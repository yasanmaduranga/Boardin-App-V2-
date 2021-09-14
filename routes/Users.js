const express= require("express");
const router= express.Router();
const mongoose= require('mongoose');
// const cors= require("cors")
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");


const User= require("../models/User");
const { Router } = require("express");
// users.use(cors())

process.env.SECRET_KEY= 'secret';

//Register an Client
router.post('/register', (req, res) => { 

    var userData= new User( {
        _id: new  mongoose.Types.ObjectId(),
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    User.find({email: req.body.email})
    .exec()
    .then(user => {
       
        if (user.length>=1) {
            res.json({success:false,message:"*** A Client already registered for this email ***"});
            
        }
        else{
        
        const hash= bcrypt.hashSync(userData.password,10) 
        userData.password= hash
        
        userData.save((err,doc)=>{
            if(!err){
                res.json({success:true,message:"Client registered successfully"})
            }
            else{
                res.json({success:false,message:"*** Client register failed ***"});  
                
            }
        })
    }}).catch(err=>{
        res.json({success:false,message:"*** Client register failed ***"});  
      
    });
    
    });



// Deleting an account
router.delete("/:userId",(req,res,next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


// Login for an user
router.post("/login", (req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length <1 ){
            return res.json({
                success:false,
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) => {
            if (err) {
                return res.status(401).json({
                    success:false,
                    message: 'Auth failed'
                })
            }
            if (result) {
                // console.log(user[0]);
                // console.log(user[0]._id);
                const token= jwt.sign( 
                    {
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        role: user[0].role,
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                
                return res.json({
                    success:true,
                    message: 'Auth successful',
                    token: token
                })
            }
        })
    })
})

// user profile
router.get('/profile', (req,res) => {
    var decoded= jwt.verify(req.headers['authorization'],process.env.SECRET_KEY);
    console.log(decoded);
    User.findOne({_id: decoded.userId}) 
    .then(user => {
        if (user) {
            res.json(user)
        }else {
            res.send('User does not exist') 
        }
    }).catch(err => {
        res.send('error: '+err)
    })
})


module.exports= router;