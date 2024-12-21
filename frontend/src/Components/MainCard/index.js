import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Whatsapp from '../Whatsapp'
import './index.css'

const Cards = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null)



    useEffect(() => {
        getCard()
    }, [id])

    const getCard = async () => {
        const response = await fetch(`http://localhost:8080/home/api/${id}`, {
            method: "GET",
        })
        const data = await response.json()
        setCard(data)
    }
    if (!card) {
        return <div>Loding</div>
    }
    return (
        <div>
            <div className="carouse">
                <Carousel data-bs-theme="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={card.image}
                            alt="First slide"
                        />
                        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={card.image}
                            alt="Second slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={card.image}
                            alt="Third slide"
                        />

                    </Carousel.Item>
                </Carousel>
            </div>
                <div class="main-card-container">
                    <h1>{card.heading}</h1>
                    <p class="explore-menu-card-title">{card.desc}</p>
                    
                    <Whatsapp data={card. whatsapp_desc}/>
                    <div class="explore-menu-card shadow p-3 mb-3">
                        <p class="explore-menu-card-img w-100"></p>

                    </div>
                </div>
            
        </div>

    )
}

export default Cards