import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import { useDispatch } from 'react-redux';

function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // perform signin
    const user = await authService.signin({
      username: username,
      password: password
    });

    console.log(user);

    // store the user in the redux store
    dispatch({
      type: 'SET_USER',
      payload: user
    });

    // clear the form
    setUsername('');
    setPassword('');

    // redirect to dashboard page
    navigate('/dashboard');
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSignIn}>
        <div>
          <input 
            type="email"
            name="email"
            placeholder="email..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input 
            type="password"
            name="password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type='submit'>Login</button>
         </div>
      </form>

      <p>Don't have an account? <Link to="/signup">Register</Link></p>
    </div>
  )
}

export default SignIn;