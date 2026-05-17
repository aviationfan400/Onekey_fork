import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const AdminMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, hasPermission, logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Only show admin menu if user has admin permissions
  if (!hasPermission('basic_admin')) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="admin-menu tw-relative" ref={menuRef}>
      <button 
        className="admin-menu-btn tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-2 tw-rounded-lg tw-transition-all tw-duration-300 hover:tw-bg-gold-600/10" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fas fa-cog tw-text-gold-600"></i>
        <span className="tw-font-sans tw-font-medium tw-text-sm tw-text-luxury-800">Admin</span>
        <i className={`fas fa-chevron-down tw-text-gold-600 tw-transition-transform tw-duration-300 ${isOpen ? 'rotated tw-rotate-180' : ''}`}></i>
      </button>
      
      {isOpen && (
        <div className="admin-dropdown active tw-absolute tw-top-full tw-left-0 tw-bg-white tw-rounded-lg tw-shadow-luxury tw-border tw-border-gold-600/20 tw-py-2 tw-min-w-48">
          <Link to="/admin" className="dropdown-item tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2 tw-text-luxury-800 tw-transition-all tw-duration-300 hover:tw-bg-gold-600/10 hover:tw-text-gold-600" onClick={() => setIsOpen(false)}>
            <i className="fas fa-tachometer-alt tw-w-4 tw-text-center"></i>
            <span className="tw-font-sans tw-font-medium tw-text-sm">View Admin Panel</span>
          </Link>
          
          <hr className="dropdown-divider tw-border-gold-600/20 tw-my-2" />
          
          <button className="dropdown-item tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2 tw-text-red-600 tw-transition-all tw-duration-300 hover:tw-bg-red-50 hover:tw-text-red-700 tw-w-full tw-text-left tw-border-none tw-bg-transparent" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt tw-w-4 tw-text-center"></i>
            <span className="tw-font-sans tw-font-medium tw-text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminMenu; 