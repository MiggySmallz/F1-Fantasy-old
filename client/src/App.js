import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';



function App(){

  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Navbar />
              <Routes>
                <Route exact path="/" element ={<Home />} />
                <Route path ="/Home" element ={<Home />} />
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
