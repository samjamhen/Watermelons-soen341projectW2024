import React, { useState } from 'react';

const LoginCard = () => {
  const [selectedRole, setSelectedRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleLogIn = () => {
    console.log(`Logging in as ${selectedRole} with email: ${email} and password: ${password}`);
  };

  const handleSignUp = () => {
    console.log(`Signing up as ${selectedRole} with email: ${email} and password: ${password}`);
  };

  return (
    <div className="login-card">
      <img src={"./logo2.png"} alt="Rentaroo Logo" className="logo2"/>
      <div className="role-options">
      <button className={selectedRole === 'customer' ? 'selected' : ''} onClick={() => handleRoleSelection('customer')}>Customer</button>
      <button className={selectedRole === 'service_rep' ? 'selected' : ''} onClick={() => handleRoleSelection('service_rep')}>Customer Service Representative</button>
      <button className={selectedRole === 'admin' ? 'selected' : ''} onClick={() => handleRoleSelection('admin')}>System Administrator</button>
      </div>
      {selectedRole && (
        <div className="credentials">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      )}
      {selectedRole === 'customer' && (
        <div>
          <button onClick={handleLogIn}>Log in</button>
          <p>Don't have an account? <a href="/Signup">Sign up here</a></p>
        </div>
      )}
    </div>
  );
};

export default LoginCard;