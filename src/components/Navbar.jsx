import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="kn-topbar">
            <div className="kn-topbar__project">AI Resume Builder</div>
            <div className="kn-nav-links">
                <NavLink to="/builder" className={({ isActive }) => isActive ? 'kn-nav-link active' : 'kn-nav-link'}>Builder</NavLink>
                <span className="kn-nav-separator">|</span>
                <NavLink to="/preview" className={({ isActive }) => isActive ? 'kn-nav-link active' : 'kn-nav-link'}>Preview</NavLink>
                <span className="kn-nav-separator">|</span>
                <NavLink to="/proof" className={({ isActive }) => isActive ? 'kn-nav-link active' : 'kn-nav-link'}>Proof</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
