import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'
import Cookies from 'js-cookie';
import ForgotPassword from '../ForgotPassword';

import { useState, useEffect } from 'react'
import { handleError, handleSuccess } from '../../utils'
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


    const navigate = useNavigate();



    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        const savedEmail = Cookies.get('email');
        const savedRememberMe = Cookies.get('rememberMe') === 'true';

        if (savedRememberMe) {
            setEmail(savedEmail);
            setRememberMe(savedRememberMe);
        }
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        const data = { password, email };
        console.log(data);
        if (!email || !password) {
            return handleError("email,password  required");
        }
        try {
            const url = "https://idtek-app.vercel.app/api/auth";
            //const url = "http://localhost:8080/api/auth";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            const { success, message, error, jwtToken, name, email } = res;
            console.log(res);
            if (success) {
                handleSuccess(message);
                if (rememberMe) {
                    Cookies.set('email', email, { expires: 7 });  // Set cookie to expire in 7 days
                    Cookies.set('rememberMe', 'true', { expires: 7 });
                } else {
                    Cookies.remove('email');
                    Cookies.remove('rememberMe');
                }
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('name', name)
                localStorage.setItem('email', email)


                setTimeout(() => {
                    navigate('/');
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
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
                        <h2>Login</h2>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" autoFocus placeholder="Enter Your Email.." onChange={onChangeEmail} value={email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" autoFocus placeholder="Enter Your Password.." onChange={onChangePassword} value={password} />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex '>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)} name="check" className='checkbox'
                            />
                            <label htmlFor="check">RememberMe</label>
                        </div>

                        <Link to='/forgot' >Forgot Password</Link>
                    </div>
                    <div className='btn-container'>
                        <button type="submit" className='sign-button'>Login</button>
                        <p>Dont have an account?<Link to='/signup'>Signup</Link></p>

                    </div>

                </form>

                <ToastContainer />
            </div>
        </div>

    )
}
export default Login
