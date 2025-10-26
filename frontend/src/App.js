import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap";
import { BrowserRouter as Route, Routes, HashRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Browse from './pages/Browse';
import Contribute from './pages/Contribute';
import About from './pages/About';
import Faq from './pages/Faq';
import Grave from './pages/Grave';
import Graveyard from './pages/Graveyard';
import User from './pages/User';
import Audit from './pages/Audit';

function App() {
  return (
    <div className="App">
        <HashRouter>
            <Navbar/>

            <Routes className="site-pages">
                <Route exact path='/' element={<Home/>}/>
                <Route path='/browse/:browseQuery' element={<Browse/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/faq' element={<Faq/>}/>
                <Route path='/contribute' element={<Contribute/>}/>
                <Route path='/audit' element={<Audit/>}/>
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/grave/:index' element={<Grave/>}/>
                <Route path='/graveyard/:index' element={<Graveyard/>}/>
                <Route path='/user/:user' element={<User/>}/>
            </Routes>

            <Footer/>
        </HashRouter>
    </div>
  );
}

export default App;
