const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
// const path = require('path');


const Advertisement = require('../models/advertisement');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, 'image-' + Date.now() + '-' + file.originalname);
    }
  });

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else{
        cb(null, false);
    }
};
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 *10},
    fileFilter: fileFilter
  });

router.post('/post-Ad',upload.array('images',8),(req,res)=>{

    // console.log(req.files);

    const advertisement = new Advertisement({
        _id:new mongoose.Types.ObjectId(),
        title: req.body.title,
        price:req.body.price,
        images: req.files
    });

    console.log(advertisement);

    advertisement.save()
    .then(result => {
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    });

});

module.exports = router;