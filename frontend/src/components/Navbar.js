import { Link, NavLink, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import { useEffect, useState } from 'react';
import TextButton from './TextButton';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import logo from "../assets/graphics/Memento-Mori-Logo.png";
import { TextAlignJustify } from 'lucide-react';
import { Search, ArrowLeft } from 'lucide-react';
import axios from 'axios';

// const SearchBar

function Navbar() {
    const [ user, setUser ] = useState(null);
    const [ headings, setHeadings ] = useState([]);
    const [ browseQuery, setBrowseQuery] = useState("");
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [focusSearchbar, setFocusSearchbar] = useState(false);
    const [hideSearchbar, setHideSearchbar] = useState(false);
    let _navigate = useNavigate();

    const navHeadings = [
        {
            endPoint: "/",
            label: "Home",
            role: "user"
        },
        {
            endPoint: "/about",
            label: "About Us",
            role: "user"
        },
        {
            endPoint: "/faq",
            label: "FAQ",
            role: "user"
        },
        {
            endPoint: "/contribute",
            label: "Contribute",
            role: "contributor"
        },
        {
            endPoint: "/audit",
            label: "Audit",
            role: "admin"
        },
    ]

    async function GetUser() {
        try {
            const _res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`, {
                withCredentials: true,
            });
            console.log(_res);
            if (_res && _res.data.user && _res.data.authentication) {
                setUser(_res.data.user);
            }
        
        } catch (error) {
            console.error("Error: ",error);
        }
        GetHeadings();
    }

    function GetHeadings () {
        let _result = [];
        navHeadings.forEach(_index => {
            if (_index.role === "user") {
                _result.push(_index);
            } else if (user) {
                
                let _canContribute = _index.role === "contributor" && (user.role === "admin" || user.role === "contributor");
                let _isAdmin = _index.role === "admin" && user.role === "admin";
                if (_canContribute || _isAdmin) {
                    _result.push(_index);
                }
            }
        });

        setHeadings(_result);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter" && browseQuery !== "") {
            let _searchBar = document.getElementById("navbar-searchbar");
            _navigate(`/browse/${_searchBar.value}`);
            _searchBar.value = "";
            _searchBar.blur();
            setFocusSearchbar(false);
            window.location.reload();
        }
    }

    function HandleOffcanvasButton (index) {
        setShowOffCanvas(false);
        _navigate(index.endPoint);
    }

    function HandleSearchbar () {
        setHideSearchbar(window.innerWidth <= 720);
        if (hideSearchbar) {

        } else {
            setFocusSearchbar(false);
        }
    }

    async function LogOutUser () {
        try {
            const _res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/logout`, {}, {
                withCredentials: true,
            });
            console.log(_res);
            _navigate("/");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    function OnLogoClick () {
        _navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        HandleSearchbar();
        GetUser();
    }, []);

    useEffect(() => {
        GetHeadings();
    }, [user]);

    return (
        <nav className='navbar-container'>
            {focusSearchbar ?
                <div className='navbar-focus-searchbar-container'>
                    <div className='navbar-mobile-back-button' onClick={()=>{setFocusSearchbar(false)}}>
                        <ArrowLeft size="2.5rem"/>
                    </div>
                    <Form.Control id='navbar-searchbar'className='navbar-mobile-searchbar' type='text' placeholder='Search...' onKeyDown={handleKeyPress} onChange={(e) =>setBrowseQuery(e.target.value)}/>
                </div>
            : 
                <>
                    <div className='navbar-offcanvas-button' onClick={() => setShowOffCanvas(true)}>
                        <TextAlignJustify size="3.5rem" strokeWidth={"0.05rem"}/>
                    </div>
                    <Link className='navbar-logo-container' onClick={OnLogoClick}>
                        <img src={logo}  className='navbar-logo'/>
                    </Link>
                
                    <div className='navbar-searchbar-container'> 
                        {hideSearchbar ? 
                            <div className='navbar-searchbar-button' onClick={()=>{setFocusSearchbar(true)}}>
                                <Search size="2.95rem" strokeWidth="0.1rem"/>
                            </div>
                        :  
                            <Form.Control id='navbar-searchbar' className='navbar-searchbar' type='text' placeholder='Search...' onKeyDown={handleKeyPress} onChange={(e) =>setBrowseQuery(e.target.value)}/>
                        }
                    </div>
                    <div id='login-button-container'>
                        {user?
                            <Link to={`/user/${user.email}`}>{user.username}</Link>
                            :
                            <TextButton className="login-button" title={"Log In/Sign Up"} endPoint={"/login"}/>
                        }
                    </div>
                </>
            }

            <Offcanvas className="navbar-offcanvas" show={showOffCanvas} onHide={() => setShowOffCanvas(false)}>
                <Offcanvas.Header closeButton>
                    <Link className='offcanvas-logo-container' to={"/"} onClick={() => setShowOffCanvas(false)}>
                        <img src={logo}  className='navbar-logo'/>
                    </Link>
                    <Offcanvas.Title>
                        Memento Mori
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {headings.map((_index) => (
                        <div 
                            className='offcanvas-link-container'
                            onClick={()=> HandleOffcanvasButton(_index)}
                        >
                            <NavLink
                                to={_index.endPoint}
                                className="offcanvas-link"
                                style={({ isActive }) => ({
                                  fontWeight: isActive ? "800" : "normal",
                                })}
                                onClick={() => setShowOffCanvas(false)}
                            >
                                {_index.label}
                            </NavLink>
                        </div>
                    ))}
                    {hideSearchbar && user  ? 
                        <NavLink to={`/user/${user.email}`}>{user.username}</NavLink>
                    :
                        null
                    }
                    <hr/>
                    <div className='offcanvas-link-container'>
                        {user?
                            <Link
                                className="offcanvas-link"
                                onClick={LogOutUser}
                            >
                                Sign Out
                            </Link>
                        :
                            <NavLink
                                to="/login"
                                className="offcanvas-link"
                                onClick={() => setShowOffCanvas(false)}
                            >
                                Log In/Sign Up
                            </NavLink>
                        }
                        
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </nav>
    );
}

export default Navbar;