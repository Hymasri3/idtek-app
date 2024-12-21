const UserVerificationModel = require('../Models/UserVerification');

const nodemailer=require("nodemailer"); 

const {v4:uuidv4}=require("uuid");

//env variables
require("dotenv").config();

var transporter=nodemailer.createTransport({
    service:"gmail",
    port:465,
    secure:true,
    logger:true,
    debug:true,
    secureConnection:false,
    auth:{
        user:'ididtekcs@gmail.com',
        pass:'degp bvvj oiud tvcg'
    },
    tls:{
        rejectUnauthorized:true
    }
});
transporter.verify((error,success)=>{
    if(error){
        console.log("Error----",error);
    }
    else{
        console.log("Ready for messages");
        console.log(success)
    }
})