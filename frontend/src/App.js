import './App.css';
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import ContactForm from './Components/ContactForm';
import Form from './Components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Whatsapp from './Components/Whatsapp';
import MainCard from './Components/MainCard';
import Cards from './Components/Cards'
import ForgotPassword from './Components/ForgotPassword';


import VerifyEmailPage from './Components/VerifyEmailPage';


function App() {

  const[isAuthenticated,setIsAuthenticated]=useState(false);

  const PrivateRoute=({element})=>{
      return isAuthenticated?element:<Navigate to='/login'/>
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
          <Route path="/" element={<Navigate to='/login'/>}/>
          <Route path="/users/:id/verify/:token" element={<VerifyEmailPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/contact" element={<ContactForm/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/home/api/:id" element={<MainCard/>}/>
          <Route path="/whatsapp" element={<Whatsapp/>}/>
          <Route path="/cards" element={<Cards/>}/>
          <Route path="/forgot" element={<ForgotPassword/>}/>
          <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
