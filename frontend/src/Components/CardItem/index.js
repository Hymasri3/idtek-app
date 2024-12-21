import React from "react";
import './index.css'
import { Link } from 'react-router-dom'

const CardItem = ({ each, id }) => {

    return (

        <li>
            {/* <div className="">
                    <p>{id}</p>
                    <p>{each.image}</p>
                    <p>{each.name}</p>
                    <p></p>
                </div> */}
            <div class="card-item-container">
                <div class="explore-menu-card shadow p-3 mb-3">
                    <img class=" w-100" src={each.image} />
                    <Link to={`api/${id}`}>{each.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                        </svg>
                    </Link>
                    <p>{each.desc}</p>
                </div>
            </div>
        </li>



    )
}
export default CardItem