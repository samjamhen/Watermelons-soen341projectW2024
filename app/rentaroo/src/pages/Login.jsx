import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import LoginCard from '../components/LoginCard';
import '../styles/LoginCard.css'





const Login = () =>{
return(

<div>

<Header/>

<LoginCard/>

<Footer/>

</div>

);



};

export default Login;