const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        minLength:[10,'no should have minimum 10 digits'],
        maxLength:[12,'no should have minimum 10 digits'],
        match:[/\d{12}/,'no should only have digits']
    },
    verified:{
        type:Boolean,
        default:false
    }
});

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	return token;
};

const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;