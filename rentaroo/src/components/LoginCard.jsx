import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom' ;

const LoginCard = () => {
  const [selectedRole, setSelectedRole] = useState('customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const users = [
  { username: "Ikram1", password: "test", role:"customer"},
  { username: "Ikram2", password: "test", role:"service_rep" }, 
  { username: "Ikram3", password: "test", role:"admin" },
]; //Demo users need to be removed once integrated with backend
  
 const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleSignIn = () => {
    // Check if username and password match any user in the predefined users list
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      // Redirect to the corresponding page based on the user's role
      switch (user.role) {
        case 'customer':
          navigate("/HomeCustomer")
          break;
        case 'service_rep':
          navigate("/HomeCSR")
          break;
        case 'admin':
          navigate("/HomeAdmin")
          break;
        default:
          return null;
      }
    } else {
      // Handle invalid credentials
      console.log('Invalid username or password');
    }
  };

  const handleSignUp =() =>{
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
      {selectedRole && (
        <button onClick={handleSignIn}>Log In</button>
        
      )}

      {selectedRole ==='customer' && (
      <button onClick={handleSignUp}>Sign Up</button>
      )}
    </div>
  );
};

export default LoginCard;

