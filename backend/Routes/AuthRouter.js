const {signup,login,address,forgotPassword,reset,reset1}=require('../Controllers/AuthController');
const { signupValidation, loginValidation,addressValidation,forgotValidation } = require('../Middlewares/AuthValidation');

const router=require('express').Router();


router.post('/users',signupValidation,signup);
router.post('/auth',loginValidation,login);
router.post('/address',addressValidation,address)
router.post('/forgot-password',forgotValidation,forgotPassword)
router.get('/reset-password/:id/:token',reset)
router.post('/reset-password/:id/:token',reset1)
module.exports=router;