import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';
import ContactForm from '../ContactForm';
import NavComponent from '../NavComponent';
import Footer from '../Footer';
import Cards from'../Cards'

import './index.css'


const Home = () => {
    //const[loggedInUser,setLoggedInUser]=useState('');
    //const [products, setProducts] = useState([]);
    // const navigate=useNavigate();
    // useEffect(()=>{
    //     setLoggedInUser(localStorage.getItem('loggedIn'));
    // },[])

    // const handleLogout=(e)=>{
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('loggedIn');
    //     handleSuccess('User LoggedOut');
    //     setTimeout(()=>{
    //         navigate('/login')
    //     },1000)
    // }

    // const fetchProducts = async () => {
    //     console.log("token", localStorage.getItem('token'))
    //     try {
    //         const url = 'http://localhost:8080/home/';
    //         const options = {
    //             headers: {
    //                 'Authorization': localStorage.getItem('token')
    //             }
    //         }
    //         const response = await fetch(url, options);
    //         const result = await response.json();
    //         console.log(result);
    //         setProducts(result);

    //     } catch (err) {
    //         handleError(err);
    //     }
    // }

    // useEffect(() => {
    //     fetchProducts()
    // }, [])

    return (
        <div>
            <div className='navbar-container'>
                <NavComponent />
                <div className="top-section-home">
                    
                </div>
                <Cards/>
                <ContactForm/>

            </div>

            {/* <div>
                {
                    products.map((item,index)=>(
                        <ul key={index}>
                            <span>{item.name}:{item.price}</span>
                        </ul>
                    ))
                }
            </div> */}
            <Footer/>
            <ToastContainer />
        </div>
    )
}
export default Home