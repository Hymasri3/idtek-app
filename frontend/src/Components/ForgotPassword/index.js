import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { handleError, handleSuccess } from '../../utils'
const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const[msg,setMsg]=useState('')
    

    const navigate = useNavigate();



    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const data = { email };
        console.log(data);
        if (!email) {
            return handleError("Email required");
        }
        try {
            const url = "https://idtek-app.vercel.app/api/forgot-password";
            const response = await fetch(url, {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            
            console.log("forgot--",res)
            const {success,message,error}=res;
            setMsg(res.message)
            // alert(res.status);
            if(success){  
                handleSuccess(message);
                // localStorage.setItem('token',jwtToken)
                // localStorage.setItem('name',name)
                // localStorage.setItem('email',email)

                // setTimeout(()=>{
                //     navigate('/login');
                // },1000)
            }else if(error){
                const details=error?.details[0].message;
                handleError(details);
            }else if(!success)
            {
                handleError(message);
            }

        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="login">
            <div className="sign-container">
                <form onSubmit={submitForm}>
                    <div>
                        <h2>Frogot Password</h2>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" autoFocus placeholder="Enter Your Email.." onChange={onChangeEmail} value={email} />
                    </div>
                    <div className='btn-container'>
                        <button type="submit" className='sign-button'>Submit</button>
                        <span>Do you want to login?<Link to='/login'>Login</Link></span>

                    </div>

                </form>
                <ToastContainer />
            </div>
        </div>

    )
}
export default ForgotPassword
