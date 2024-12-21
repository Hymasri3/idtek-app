const joi=require('joi')

const signupValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        password:joi.string().alphanum().min(4).max(100).required(),
        mobileNo:joi.string().min(10).max(12).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error})
    }
    next();
}
const loginValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).max(100).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error})
    }
    next();
}
const addressValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        address:joi.string().min(4).max(100).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error})
    }
    next();
}
const forgotValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().email().required(),
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error})
    }
    next();
}
module.exports={
    signupValidation,
    loginValidation,
    addressValidation,
    forgotValidation
}