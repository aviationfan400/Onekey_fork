import React from 'react';
import { Link } from 'react-router-dom';

const GetInvolved: React.FC = () => {
  return (
    <div className="get-involved-page">
      <div className="container">
        <h1>Get Involved</h1>
        <p>Join our community of volunteers and make a meaningful impact through music and service.</p>
        
        <div className="involvement-options">
          <div className="option-card">
            <i className="fas fa-users"></i>
            <h3>Volunteer</h3>
            <p>Join our team of dedicated volunteers and help us make a difference in the community.</p>
            <Link to="/contact" className="cta-button">Join Now</Link>
          </div>
          
          <div className="option-card">
            <i className="fas fa-music"></i>
            <h3>Perform</h3>
            <p>Share your musical talents by performing at our community events and senior home visits.</p>
            <Link to="/contact" className="cta-button">Apply</Link>
          </div>
          
          <div className="option-card">
            <i className="fas fa-handshake"></i>
            <h3>Partner</h3>
            <p>Collaborate with us as an organization or sponsor to expand our community impact.</p>
            <Link to="/contact" className="cta-button">Partner</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved; 