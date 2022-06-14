import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Stats from './pages/Stats';
import 'bootstrap/dist/css/bootstrap.min.css';




function App(){

  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Navbar />
              <Routes>
                <Route exact path="/" element ={<Home />} />
                <Route path ="/Home" element ={<Home />} />
                <Route path ="/Stats" element ={<Stats />} />
              </Routes>
        </div>
      </div>
    </BrowserRouter>
    // <div>
    //   Hello
    // </div>
  )
}

export default App
