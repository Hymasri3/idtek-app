import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
const Whatsapp = ({data}) => {
    const number = "9392333576";
    const message = data;
    const waLink = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    return (
        <div>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
                <button><FaWhatsapp /></button>
            </a>
            <br></br>
            <a href={`tel:${number}`} >
            <FaPhoneAlt /> +91 9392333555
            </a>
        </div>
    )
}
export default Whatsapp;