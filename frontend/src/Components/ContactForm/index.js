import { v4 as uuidv4 } from 'uuid';
import AddressItem from "../AddressItem.js";
import { handleError, handleSuccess } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { useState, useEffect } from "react"
import React from "react";
import Swal from 'sweetalert2'
import './index.css'
import { FaDeleteLeft } from "react-icons/fa6";

const ContactForm = () => {

    const [result, setResult] = React.useState("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [addressList, setAddressList] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
  //  const [radioVal, setRadioVal] = useState('default')


    const navigate = useNavigate();

    const onSubmitForm = async (event) => {

        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "da60beeb-388f-4de0-9cd1-5f8e3b8148e2");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            Swal.fire({
                title: "Success!",
                text: "Message sent success",
                icon: "success"
            });
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    const addAddress = async () => {
        const data = { name, email, address };
        if (!name || !email || !address) {
            return handleError("name,email and Address required");
        }
        try {
            const url = "http://localhost:8080/api/address";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(data)
            });
            const res = await response.json();
            const { success, message, error } = res;
            console.log(res)
            console.log(success)
            if (success) {
                handleSuccess(message);
                Swal.fire({
                    title: "saved successfully in DB",
                    text: message,
                    icon: "success"
                });
                console.log(message)
                // setTimeout(() => {
                //     navigate('/home');
                // }, 5000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
                console.log(details)

            } else if (!success) {
                handleError(message);
                console.log(message)
            }

        } catch (err) {
            handleError(err);
        }
    }


    const fetchProducts = async () => {

        try {
            const url = 'http://localhost:8080/address/';
            const options = {
                method: "GET",
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, options);
            const result = await response.json();
            const { name, email } = result[0]
            setName(localStorage.getItem('name'))
            setEmail(localStorage.getItem('email'))
            setAddressList(result)


        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])



    const onChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    // const changeRadio = (event) => {
    //     setRadioVal(event.target.value)
    // }

    const deleteItem = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/address/${email}`, {
                method: 'DELETE'
            });
            setAddressList(addressList.filter(addresss => addresss.email !== email))

        }
        catch (error) {
            console.log(error)
        }

    }

    const handleItemClick = (item) => {
        const { address } = item
        setSelectedItem(address)
    }

    return (
        <div className="contact-form">
            <form className="c-form">
                <h2>Contact Form</h2>
                <div className="form-split">
                    <div className="first-half">
                        <div className="input-box">
                            <input type="text" className="field" placeholder="Enter Your Name" value={name} onChange={changeName} />
                        </div>
                        <div className="input-box">
                            <input type="text" className="field" placeholder="Enter Your Email" value={email} onChange={changeEmail} />
                        </div>
                        <div className="input-box">
                            <textarea type="text" className="field mess" placeholder="Enter Your Message" rows={2} required></textarea>
                        </div>
                        <div className="input-box add">
                            <textarea type="text" value={address} id="ad1" onChange={onChangeAddress} placeholder='Want to add address' className="field mess"></textarea>
                            <button onClick={addAddress} className="addBtn">addAddress</button>
                        </div>
                    </div>
                    <div className="second-half">
                        <div className="input-box">
                            <textarea type="text" value={selectedItem} id="ad2" placeholder='Add only below default address' className="field mess"></textarea>
                           <div>
                                <ul className='address-item'>
                                    {addressList.map((item, index) => (
                                        <li key={index} onClick={() => handleItemClick(item)} className="address-list">
                                            {item.address}
                                            <button onClick={() => deleteItem(item.email)} className="delete-btn">
                                                <FaDeleteLeft />
                                            </button>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" onClick={onSubmitForm} className='submit-btn'>Send Message</button>
            </form>
            <ToastContainer />
        </div>
    )
}
export default ContactForm