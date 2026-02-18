import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="kn-home-container kn-text-center">
            <h1 className="kn-home-title">Build a Resume That Gets Read.</h1>
            <p className="kn-home-subtitle">Professional, clean, and ATS-friendly resumes in minutes.</p>
            <Link to="/builder" className="kn-btn kn-btn--primary kn-btn--lg">Start Building</Link>
        </div>
    );
};

export default Home;
