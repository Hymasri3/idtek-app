const router=require('express').Router();
const UserModel = require('../Models/User');
const TokenModel = require('../Models/Token');

router.get('/:id/verify/:token',async(req,res)=>{
    try{
        const user=await UserModel.findOne({_id:req.params.id});
        if(!user) return res.status(400).json({message:'Invalid link'});

        const token=await TokenModel.findOne({
            userId:user._id,
            token:req.params.token
        });
        if(!token) return res.status(400).json({message:"invalid link"});
        await UserModel.updateOne({_id:user._id,verified:true});
        await TokenModel.deleteOne({userId:user._id});  
        res.status(200).json({message:"Email verified successfully"})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
})

module.exports=router;