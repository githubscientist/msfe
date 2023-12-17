import React from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div>
      <h3>Login</h3>
      <form>
        <div>
          <input 
            type="email"
            name="email"
            placeholder="email..."
          />
        </div>

        <div>
          <input 
            type="password"
            name="password"
            placeholder="password..."
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