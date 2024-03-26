import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import SignupCard from '../components/SignupCard';
import '../styles/LoginCard.css'


const Signup = () =>{
return(

<div>

<Header/>

<SignupCard/>

<Footer/>

</div>

);



};

export default Signup;