import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import AuthModal from '../Auth/AuthModal';

const Footer: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      return;
    }
    setShowAuthModal(true);
  };

  return (
    <>
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">ONEKEY</div>
            <p className="footer-tagline">Student volunteers bridging generations through music, education, and community service</p>
            <p className="footer-contact">on3keymusic@gmail.com</p>
          </div>
          
          <div className="footer-links">
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/timeline">Timeline</Link>
            <Link to="/team">Meet Our Team</Link>
          </div>
          
          <div className="footer-connect">
            <h4>Connect With Us</h4>
            <div className="footer-social">
              <a href="https://instagram.com/onekey" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="mailto:on3keymusic@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom tw-flex tw-justify-between tw-items-center tw-px-8 tw-py-4">
          <div className="footer-bottom-left tw-flex-1">
            <p className="footer-school tw-text-sm tw-text-luxury-600">Website made by Curtis Wei and Ethan Xie</p>
          </div>
          <div className="footer-bottom-center tw-flex-1 tw-text-center">
            <p className="tw-text-sm tw-text-luxury-600">&copy; 2023 OneKey Student Volunteers. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right tw-flex-1 tw-flex tw-justify-end">
            {!isAuthenticated && (
              <button className="footer-login-btn tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-gold-600 tw-text-white tw-rounded-lg tw-font-sans tw-font-medium tw-text-sm tw-uppercase tw-tracking-wide tw-transition-all tw-duration-300 hover:tw-bg-gold-700 hover:tw-transform hover:tw--translate-y-1" onClick={handleAuthClick}>
                <i className="fas fa-sign-in-alt"></i>
                Login
              </button>
            )}
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Footer; 