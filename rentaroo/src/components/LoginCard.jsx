import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const LoginCard = () => {
  const [selectedRole, setSelectedRole] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    await login(email, password);
  };  

  return (
    <div className="login-card">
      <img src={"./logo2.png"} alt="Rentaroo Logo" className="logo2"/>
      <div className="role-options">
      <button className={selectedRole === 'client' ? 'selected' : ''} onClick={() => handleRoleSelection('client')}>Customer</button>
      <button className={selectedRole === 'customer_representative' ? 'selected' : ''} onClick={() => handleRoleSelection('customer_representative')}>Customer Service Representative</button>
      <button className={selectedRole === 'system_administrator' ? 'selected' : ''} onClick={() => handleRoleSelection('system_administrator')}>System Administrator</button>
      </div>
      {selectedRole && (
        <div className="credentials">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      )}
      {selectedRole === 'client' && (
        <div>
          <button disabled = {isLoading} onClick={handleLogIn}>Log in</button>
          {error && <div className="error">{error}</div>}
          <p>Don't have an account?</p>
          <Link to="/Signup">
            Sign up here
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginCard;