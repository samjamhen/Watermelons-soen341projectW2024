import React, { useState } from 'react';
import {useSignup} from '../hooks/useSignup';


const SignupCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const {signup, isLoading, error} = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    await signup(name, email, password, phoneNumber);

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
  };

  return (
    <div className="login-card">
    <img src={"./logo2.png"} alt="Rentaroo Logo" className="logo2"/>
      <div className="credentials">
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => {
          setPassword(e.target.value)
          setPasswordMatch(e.target.value === confirmPassword)
          }} />
        <span style={{ fontSize: '0.8rem', color: 'gray' }}>
        Password must contain:
        <ul style={{ paddingLeft: '20px', margin: '0', marginBottom: '15px' }}>
          <li>At least 8 characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character</li>
        </ul>
      </span>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value)
            setPasswordMatch(e.target.value === password);
        }} 
        />
        {!passwordMatch && confirmPassword && <span style={{color: 'red'}}>Passwords do not match.</span>}
        <input type="text" placeholder="Phone Number (xxx-xxx-xxxx)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button disabled = {isLoading || !name || !email || !password || !confirmPassword || !phoneNumber || !passwordMatch} onClick={handleSignup}>Sign up</button>
      {error && <div className="error">{error}</div>}
  </div>
  );
};

export default SignupCard;