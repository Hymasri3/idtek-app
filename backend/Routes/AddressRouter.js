const ensureAuthentication = require('../Middlewares/HomeAuth');
const AddressModel = require('../Models/Address');

const router=require('express').Router();

//ensureAuthentication
// router.get('/',(req,res)=>{
//     console.log("Address User",req.user);
//    // console.log(res.status())
//     res.status(200).json([
//         {
//             name:"address1",
//             price:"1000"
//         },
//         {
//             name:"laptop",
//             price:"2000"
//         }
//     ])
// });



router.get('/',ensureAuthentication,async (req,res)=>{
    const {email}=req.user
   // console.log("mail",email)
    try{
        const data=await AddressModel.find({ email: req.user.email });
        res.send(data)
        console.log(data)
    }
    catch(err){
        res.send(err)
    }
});

router.delete('/:email',async(req,res)=>{
    const{email}=req.params
    try{
        await AddressModel.findOneAndDelete(email);
        res.status(200).json({message:'item deleted successfull'});
    }
    catch(error){
        res.status(500).json({message:'Error deleting item',error:error})
    }
})


module.exports=router;