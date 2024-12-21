const router=require('express').Router();
const data=[{
    id:0,
    image:'https://res.cloudinary.com/dohbfsl9b/image/upload/v1730173560/idtekcs/logo_a8fyqi.webp',
    heading:"Personal Function Shoots",
    desc:"dessssssssssssssssssss",
    whatsapp_desc:'Hello, Personal Function Shooots'
},
{
    id:1,
    image:'https://res.cloudinary.com/dohbfsl9b/image/upload/v1730173560/idtekcs/logo_a8fyqi.webp',
    heading:"Small Function Shoots",
    desc:"dessssssssssssssssssss",
     whatsapp_desc:'Hello, Small Function shoots!'
},
];

router.get('/api/:id',(req,res)=>{
    const cardId=parseInt(req.params.id);

    const card=data.find(each=>each.id===cardId);

    if(card){
        res.json(card)
    }else{
res.status(404).send({message:'Card not Found'})
    }
});
module.exports=router;