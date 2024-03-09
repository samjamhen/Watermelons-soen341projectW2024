import React, { useState } from 'react';

const LoginCard = () => {
  const [selectedRole, setSelectedRole] = useState('customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleSignIn = () => {
    console.log(`Signing in as ${selectedRole} with username: ${username} and password: ${password}`);
  };

  return (
    <div className="login-card">
      <img src={"./logo2.png"} alt="Rentaroo Logo" className="logo2"/>
      <div className="role-options">
      <button className={selectedRole === 'customer' ? 'selected' : ''} onClick={() => handleRoleSelection('customer')}>Customer</button>
      <button className={selectedRole === 'service_rep' ? 'selected' : ''} onClick={() => handleRoleSelection('service_rep')}>Customer Service Representative</button>
      <button className={selectedRole === 'admin' ? 'selected' : ''} onClick={() => handleRoleSelection('admin')}>Administrator</button>
      </div>
      {selectedRole && (
        <div className="credentials">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      )}
      {selectedRole === 'customer' && (
        <button onClick={handleSignIn}>Sign up</button>
      )}
    </div>
  );
};

export default LoginCard;

