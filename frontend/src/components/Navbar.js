import { NavLink } from 'react-router-dom';
import './css/Navbar.css';
import { useEffect, useState } from 'react';
import TextButton from './TextButton';
function Navbar() {
    const [ user, setUser ] = useState(null);
    const [ headings, setHeadings ] = useState([]);

    const navHeadings = [
        {
            endPoint: "/",
            label: "Home",
            role: "User"
        },
        {
            endPoint: "/browse",
            label: "Browse",
            role: "User"
        },
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

            <TextButton className="login-button" title={"Log In"} endPoint={"/login"}/>
        </nav>
    );
}

export default Navbar;