import React, { useState } from 'react';

const SignupCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="login-card">
    <img src={"./logo2.png"} alt="Rentaroo Logo" className="logo2"/>
      <div className="credentials">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button onClick={handleSignup}>Sign up</button>
  </div>
  );
};

export default SignupCard;