import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import Cookies from 'js-cookie';
import './index.css'
const NavComponent = () => {
    const[loggedInUser,setLoggedInUser]=useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('name'));
    },[])

    const handleLogout=(e)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name'); 
        localStorage.removeItem('email'); 
        Cookies.remove('email');
        Cookies.remove('rememberMe');
        handleSuccess('User LoggedOut');
        setTimeout(()=>{
            navigate('/login')
        },1000)
    }

    const first_char=loggedInUser.charAt(0).toUpperCase();
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dohbfsl9b/image/upload/v1730173560/idtekcs/logo_a8fyqi.webp" className="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto" fill variant="tabs" defaultActiveKey="/home">
                        <Nav.Item><Nav.Link href="#features">Home</Nav.Link></Nav.Item>
                        <Nav.Item> <Nav.Link href="#pricing">About</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="#pricing">Services</Nav.Link></Nav.Item>
                        </Nav>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                        <h1 className="profile-name">{first_char}</h1>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavComponent