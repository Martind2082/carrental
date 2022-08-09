import './index.css';
import Home from './Components/Home';
import About from './Components/About';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import FirebaseContext from './FirebaseContext';
import Header from './Components/Header';
import Login from './Components/Login';
import Createaccount from './Components/Createaccount';

function App() {
  return (
    <FirebaseContext>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/createaccount" element={<Createaccount />}/>
        </Routes>
      </Router>
    </FirebaseContext>
  );
}

export default App;
