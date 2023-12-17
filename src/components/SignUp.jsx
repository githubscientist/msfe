import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth';

function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

        const user = {
            name: name,
            username: email,
            password: password
        }

        console.log(user);

        // call the signup service
        authService.signup(user);

        setName('');
        setEmail('');
        setPassword('');
    }

  return (
    <div>
        <h3>Register</h3>
          <form onSubmit={handleSignUp}>
              <div>
                  <input 
                        type="text"
                        name="name"
                      placeholder="name..."
                      value={name}
                        onChange={(e) => setName(e.target.value)}
                  />
              </div>

              <div>
                  <input 
                        type="email"
                        name="email"
                      placeholder="email..."
                        value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

                <div>
                    <input 
                            type="password"
                            name="password"
                      placeholder="password.."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              
              <div>
                  <button type='submit'>Register</button>
              </div>
          </form>  
          
          <p>Already Registered ? <Link to="/signin">Login</Link></p>
    </div>
  )
}

export default SignUp;