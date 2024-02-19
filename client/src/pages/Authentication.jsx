import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Authentication = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 


  const handleLoginOrRegistration = async (e) => {
    e.preventDefault();

    const endpoint = showRegistration ? '/auth/register' : '/auth/login';
    const baseUrl = 'http://localhost:3001';
    const queryParams = `?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    console.log(`${baseUrl}${endpoint}${queryParams}`)
    try {
      const response = await axios.post(`${baseUrl}${endpoint}${queryParams}`);

      console.log(response)
      window.alert(response.data.message);


      if (response.data.status === "1") {
        Cookies.set('token', response.data.token);
        Cookies.set('userID', response.data.userID);
        
        navigate('/profile');
      } else {
        console.error('Authentication faled:', response.data.message);
      }
    } catch (error) {
      console.error('Authenticaztion error:', error.response?.data?.message || error.message);
    }
  };
  return (
    <div className='authpage'>
      <div className="circle"></div>

      <div className="formdiv">
        <div className="img">
          <img src="./../src/assets/image/login.jpg" alt="" className='loginimg' />
        </div>
        <div>
          <div className="formheading">
            {showRegistration ? 'Register' : 'Login'}
          </div>
          <form onSubmit={handleLoginOrRegistration}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                              onChange={(e) => setUsername(e.target.value)} 

              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="exampleInputPassword1" 
               onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="ads"></div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div className="goto">
            {!showRegistration ? (
              <>
                Don't have an account?
                <a href="#" onClick={() => setShowRegistration(true)}>Register</a>
              </>
            ) : (
              <>
                Already have an account?
                <a href="#" onClick={() => setShowRegistration(false)}>Login</a>
              </>
            )}
          </div>
        </div>
        {showRegistration && (
          <div>
            {/* Registration form content goes here */}
          </div>
        )}
      </div>
    </div>
  );
};
