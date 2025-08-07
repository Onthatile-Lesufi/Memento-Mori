import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/browse' element={<Home/>}/>
                <Route path='/about' element={<Home/>}/>
                <Route path='/faq' element={<Home/>}/>
                <Route path='/contribute' element={<Home/>}/>
                <Route path='/audit' element={<Home/>}/>
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
            </Routes>

            <Footer/>
        </Router>
    </div>
  );
}

export default App;
