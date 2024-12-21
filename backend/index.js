const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter=require('./Routes/AuthRouter')
const HomeRouter=require('./Routes/HomeRouter')
const AddressRouter=require('./Routes/AddressRouter')
const CardsRouter=require('./Routes/CardsRouter')
const VerifyEmailRouter=require('./Routes/VerifyEmailRouter')
require('dotenv').config();
require('./Models/db');


const PORT=process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send("PONG");
})

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))

app.use(bodyParser.json());
app.use(cors());
app.use('/api',AuthRouter);
app.use('/home',HomeRouter);
app.use('/address',AddressRouter);
app.use('/home',CardsRouter);
app.use("/users",VerifyEmailRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})