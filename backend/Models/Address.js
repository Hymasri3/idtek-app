const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const AddressSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true
    }
});

const AddressModel=mongoose.model('addresses',AddressSchema);
module.exports=AddressModel;