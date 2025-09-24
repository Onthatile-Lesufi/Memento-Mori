import { NavLink, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import { useEffect, useState } from 'react';
import TextButton from './TextButton';
import { Form } from 'react-bootstrap';
function Navbar() {
    const [ user, setUser ] = useState(null);
    const [ headings, setHeadings ] = useState([]);
    const [ browseQuery, setBrowseQuery] = useState("");
    let _navigate = useNavigate();

    const navHeadings = [
        {
            endPoint: "/",
            label: "Home",
            role: "User"
        },
        // {
        //     endPoint: "/browse",
        //     label: "Browse",
        //     role: "User"
        // },
        {
            endPoint: "/about",
            label: "About Us",
            role: "User"
        },
        {
            endPoint: "/faq",
            label: "FAQ",
            role: "User"
        },
        {
            endPoint: "/contribute",
            label: "Contribute",
            role: "Contributor"
        },
        {
            endPoint: "/audit",
            label: "Audit",
            role: "Admin"
        },
    ]

    async function GetUser() {
        let _result = [ ];
        navHeadings.forEach(_index => {
            if (_index.role === "User") {
                _result.push(_index);
            } else if (user) {
                let _canContribute = _index.role === "Contributor" && (user.role === "Admin" || user.role === "Contributor");
                let _isAdmin = _index.role === "Admin" && user.role === "Admin";
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
        }
    }

    useEffect(() => {
        GetUser();
    }, []);

    return (
        <nav className='navbar-container'>
            <div className='nav-buttons'>
                {headings.map((_index) => (
                    <NavLink
                        to={_index.endPoint}
                        className="navbar-link"
                        style={({ isActive }) => ({
                          fontWeight: isActive ? "800" : "normal",
                        })}
                    >
                        {_index.label}
                    </NavLink>
                ))}
            </div>

            <div className='navbar-searchbar-container'>
                <Form.Control id='navbar-searchbar' className='navbar-searchbar' type='text' placeholder='Search...' onKeyPress={handleKeyPress} onChange={(e) =>setBrowseQuery(e.target.value)}/>
            </div>

            <div id='login-button-container'>
                <TextButton className="login-button" title={"Log In/Sign Up"} endPoint={"/login"}/>
            </div>
        </nav>
    );
}

export default Navbar;