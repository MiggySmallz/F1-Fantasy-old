import React, {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom';
import Home from '../pages/Home';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import "./SigningForm.css"


// function LogIn({ setToken }){
function LogIn(){
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(false)
  // const [redirect, setRedirect] = useState(false)



  // useEffect(() => {
  //  console.log("ddddddd")
  // }, [navigate])

  async function sendLogIn() {
    return fetch("http://localhost:5000/logIn", {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': 'http://localhost:5000/'
      },
      body: JSON.stringify({email:email, pass:password}) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(data => {
      setErrorMessage(!data.loginVerification); 
      // setRedirect(data.loginVerification); 
      if (data.token != undefined){
        localStorage.setItem('token', data.token);
      }
      
    })
  }

  
  const ErrorMsg = () => (
    <p class="error-message">*Incorrect Username or password</p>
  )


  const handleSubmit = async e => {
    e.preventDefault();
    await sendLogIn();
    if ((localStorage.getItem('token')) != null){
      navigate('/Home');  
      window.location.reload();    
    }
  }
  

  return (
    <div className="background">
      {/* <div className="sign-up-container">
        <h1>Sign Up</h1>
        <input className="input"></input>
        <input className="input"></input>
      </div> */}
      <div class="box" id="login">
        <form onSubmit={handleSubmit}>
          <span class="text-center">Log In</span>
        <div class="input-container">		
          <input type="text" required onChange={e => setEmail(e.target.value)}/>
          <label>Email</label>
        </div>
        <div class="input-container">		
          <input type="password" required onChange={e => setPassword(e.target.value)}/>
          <label>Password</label>
        </div>
          { errorMessage ? <ErrorMsg /> : null }
          {/* { redirect ? <Redirect /> : null } */}
          <button type="submit" class="btn">submit</button>
      </form>	
      </div>
    </div>
    
  );

}

// LogIn.propTypes = {
//   setToken: PropTypes.func.isRequired
// }

export default LogIn

