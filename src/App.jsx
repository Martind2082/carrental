import './index.css';
import Home from './Components/Home';
import About from './Components/About';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import FirebaseContext from './FirebaseContext';
import Header from './Components/Header';
import Login from './Components/Login';
import Createaccount from './Components/Createaccount';
import Carsinfo from './Components/Carsinfo';
import { useState } from 'react';
import Cars from './Components/Cars';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import Carinfo from './Components/Carinfo';
import Garage from './Components/Garage';

function App() {
  const [sort, setSort] = useState();

  const rating = (num) => {
    if (num === 5) {
      return <div className='flex text-yellow-500'><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
    } else {
      return <div className='flex text-yellow-500'><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/></div>
    }
  }
  const [cartitems, setcartitems] = useState([]); 
  return (
    <FirebaseContext>
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home setSort={setSort}/>}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/createaccount" element={<Createaccount />}/>
          <Route exact path="/cars" element={<Cars rating={rating} />}/>
          <Route exact path="/cars/:name" element={<Carsinfo sort={sort} setSort={setSort} rating={rating} cartitems={cartitems} setcartitems={setcartitems}/>}/>
          <Route exact path="/car/:id" element={<Carinfo rating={rating} cartitems={cartitems} setcartitems={setcartitems}/>}/>
          <Route exact path="/garage" element={<Garage cartitems={cartitems} setcartitems={setcartitems}/>}/>
        </Routes>
      </Router>
    </FirebaseContext>
  );
}

export default App;
