import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Stats from './pages/Stats';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Fantasy from './pages/Fantasy';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'));
  const [userName, setUserName] = useState();

   useEffect(() => {
   
    if (localStorage.getItem('token') != null){
      getUserName()
    }
  }, [userName])

  async function getUserName() {
    const response = await fetch("http://localhost:5000/getUserName", {
    method: 'POST', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': 'http://localhost:5000/'
    },
    body: JSON.stringify({token:localStorage.getItem('token')}) // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .then(data => setUserName(data.name));
  }


  

  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
        <Navbar loggedIn={userName} />
              <Routes>
                <Route exact path="/" element ={<Home />} />
                <Route path ="/Home" element ={<Home />} />
                <Route path ="/Stats" element ={<Stats />} />
                <Route path ="/SignUp" element ={<SignUp />} />
                <Route path ="/LogIn" element ={<LogIn />} />
                <Route path ="/Fantasy" element ={<Fantasy />} />
              </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
