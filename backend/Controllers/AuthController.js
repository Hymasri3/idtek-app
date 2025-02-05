const bcrypt=require('bcrypt');
const UserModel = require("../Models/User");
const jwt=require('jsonwebtoken');
const sendEmail=require('../Utils/sendEmail');
const AddressModel=require('../Models/Address');
const crypto=require('crypto');
const TokenModel=require('../Models/Token');
const router=require('express').Router();

const signup=async(req,res)=>{
    try{
        const{name,email,password,mobileNo}=req.body;
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:'User already exist, you can login',success:false});
        }
        const userModel=new UserModel({name,email,password,mobileNo});
        userModel.password=await bcrypt.hash(password,10);
        user =await userModel.save();
        const token=await new TokenModel({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex")
        }).save();
        const url=`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email,"Verify Email",url)
        res.status(201)
            .json({
                message: 'An email sent to your account please verify',
                success:true
            })
    }
    catch(err){
        res.status(500)
        .json({
            message:'Internal Server Error',
            success:false
        })
    }
}

// router.get('/:id/verify/:token',async(req,res)=>{
//     try{
//         const user=await UserModel.findOne({_id:req.params.id});
//         if(!user) return res.status(400).json({message:'Invalid link'});

//         const token=await TokenModel.findOne({
//             userId:user._id,
//             token:req.params.token
//         });
//         if(!token) return res.status(400).json({message:"invalid link"});
//         await UserModel.updateOne({_id:user._id,verified:true});
//         await TokenModel.deleteOne({userId:user._id});  
//         res.status(200).json({message:"Email verified successfully"})
//     }
//     catch(error){
//         res.status(500).json({message:"Internal Server Error"})
//     }
// })

const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await UserModel.findOne({email});
        const errorMsg="Auth failed email or password is wrong";
        if(!user){
            return res.status(403)
            .json({message:errorMsg,success:false});
        }
        const isPassEqual=await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({message:errorMsg,success:false});
        }

        if(!user.verified){
            let token=await TokenModel.findOne({userId:user._id});
            console.log("token--",token)
            if(!token){
                 token=await new TokenModel({
                    userId:user._id,
                    token:crypto.randomBytes(32).toString("hex")
                }).save();
                const url=`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
                await sendEmail(user.email,"Verify Email",url)

            }
            return res.status(400).send({message:'An Email sent to your account plase verify'})
        }

        const jwtToken=jwt.sign({email:user.email,_id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}

        )
 
        res.status(200)
            .json({
                message:'Login success',
                success:true,
                jwtToken,
                email,
                name:user.name
            })
    }
    catch(err){
        res.status(500)
        .json({
            message:'Internal server Error',
            success:false
        })
    }
}


const address=async(req,res)=>{
    try{
        const{name,email,address}=req.body;
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(409)
            .json({message:'Invalid user',success:false});
        }
        console.log(user)
        const addressModel=new AddressModel({name,email,address});
        await addressModel.save();
        console.log("saved")
        res.status(201)
            .json({
                message:'address saved successfully in DB',
                success:true
            })
    }
    catch(err){
        res.status(500)
        .json({
            message:'Already this Address added in DB use default option',
            success:false
        })
    }
}

const forgotPassword=async(req,res)=>{ 
    const {email}=req.body;
    console.log("forgot")
    // try{
    //     const oldUser =await UserModel.findOne({email});
    //     if(!oldUser){
    //         return res.json({status:"User not Exist"});
    //     }
    //     const secret=process.env.JWT_SECRET+oldUser.password;
    //     const token=jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:"5m"})
    //     const link=`${process.env.BASE_URL}api/reset-password/${oldUser._id}/${token}`;
    //     await sendEmail(oldUser.email,"password reset",link) 
    // }
    // catch(error){

    // }
}

const reset=async(req,res)=>{
    const {id,token}=req.params
    console.log(req.params)

    const oldUser =await UserModel.findOne({_id:id});
    if(!oldUser){
        return res.json({status:"User not Exist"});
    }
    const secret=process.env.JWT_SECRET+oldUser.password;
    try{
        const verify=jwt.verify(token,secret);
        res.render("index",{email:verify.email,status:"Not Verified"});
    }
    catch(error){
        res.send("not verified")
    }
}

const reset1=async(req,res)=>{
    const {id,token}=req.params
    const {password,cpassword}=req.body
    console.log(req.params)

   
        const oldUser =await UserModel.findOne({_id:id});
        if(!oldUser){
            return res.json({status:"User not Exist"});
        }
        const secret=process.env.JWT_SECRET+oldUser.password;
        try{
            const verify=jwt.verify(token,secret);
           const encryptedPassword=await bcrypt.hash(password,10)
           await UserModel.updateOne(
            {
                _id:id,
            },
            {
                $set:{
                    password:encryptedPassword
                },
            }
           )
           res.render("index",{email:verify.email,status:"verified"});
    
        }
        catch(error){
            res.send("something went wrong")
        }
        
   


}

module.exports={
    signup,
    login,
    address,
    forgotPassword,
    reset,
    reset1
}
