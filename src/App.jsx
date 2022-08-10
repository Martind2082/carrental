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

function App() {
  const [sort, setSort] = useState();
  return (
    <FirebaseContext>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home setSort={setSort} />}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/createaccount" element={<Createaccount />}/>
          <Route exact path="/cars" element={<Cars />}/>
          <Route exact path="/cars/:name" element={<Carsinfo sort={sort} />}/>
        </Routes>
      </Router>
    </FirebaseContext>
  );
}

export default App;
