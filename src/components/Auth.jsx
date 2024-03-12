import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg'
const Auth = () => {
  const[isSignUp, setIsSignUp] = useState(false);
  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignUp?'Sign Up': 'Sign In'}</p>
        </div>

      </div>

    </div>
  )
}

export default Auth