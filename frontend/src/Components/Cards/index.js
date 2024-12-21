import React from "react";
import CardItem from "../CardItem";
import './index.css'

const cards=[
    {
        image:'https://res.cloudinary.com/dohbfsl9b/image/upload/v1730173560/idtekcs/logo_a8fyqi.webp',
        name:"Personal photoshoots",
        desc:"capture your cherished moments with stunning personal photography."
    },
    {
        image:'https://res.cloudinary.com/dohbfsl9b/image/upload/v1730173560/idtekcs/logo_a8fyqi.webp',
        name:"Samll function photoshoots",
        desc:"capture your cherished moments with stunning personal photography."
    },
    
]
const Cards=()=>{
    return(<div >
        <ul className="card-container">
            {cards.map((each,index)=><CardItem each={each} id={index}/>)}
        </ul>
    </div>)
}
export default Cards