import React from 'react';
import './Header.css'
import logo from './logo.png'

const Header = () =>{
    return (
        <div className="Header">
            <img src={logo} className="Header-logo" />
            HEader
        </div>
    );
}

export default Header;