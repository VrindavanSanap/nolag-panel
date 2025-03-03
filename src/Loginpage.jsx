import PropTypes from 'prop-types';
import { useState } from 'react';
import './Loginpage.css';

const LoginPage = ({ on_login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      console.log('Logging in with:', username, password);
      on_login();
    } else {
      console.log('Please enter both username and password.');
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1 className="welcome-heading">Welcome back!</h1>
        <p className="credentials-text">Enter your Credentials to access your account</p>
        <label className="label username-label" htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="label" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="right-section"></div>
    </div>
  );
};

LoginPage.propTypes = {
  on_login: PropTypes.func.isRequired,
};

export default LoginPage;