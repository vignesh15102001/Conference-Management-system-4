import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'; // Assume you have a CSS file for styling your navbar

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/papers" className="nav-link">Papers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
