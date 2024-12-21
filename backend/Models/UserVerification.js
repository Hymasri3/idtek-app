const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const UserVerificationSchema=new Schema({
    userId:{
        type:String
    },
    uniqueString:{
        type:String
    },
    createdAt:{
        type:Date
    },
    expiresAt:{
        type:Date
    }
});

const UserVerificationModel=mongoose.model('userVerification',UserVerificationSchema);
module.exports=UserVerificationModel;