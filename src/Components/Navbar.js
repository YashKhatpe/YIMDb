import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand nav-heading" to="/"><h2 style={{border: '2px solid black', borderRadius: '7px'}}>YIMDb</h2></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-light active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/popular">Popular</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/top_rated">Top Rated</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/upcoming">Upcoming</Link>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
    </>
  );
}

export default Navbar;
