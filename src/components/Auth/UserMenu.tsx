import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore, User } from '../../store/authStore';
import UserManagement from './UserManagement';
import ActivityLogs from './ActivityLogs';

interface UserMenuProps {
  user: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout, hasPermission } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleIcon = (role: string) => {
    // Use generic user icon for all roles to hide admin status
    return 'fas fa-user';
  };

  const getDisplayName = () => {
    // Return empty string to hide user name display
    return '';
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleManageUsers = () => {
    setShowUserManagement(true);
    setIsOpen(false);
  };

  const handleViewLogs = () => {
    setShowActivityLogs(true);
    setIsOpen(false);
  };

  return (
    <div className="user-menu tw-relative" ref={menuRef}>
      <button 
        className="user-btn tw-flex tw-items-center tw-gap-2 tw-p-2 tw-rounded-lg tw-transition-all tw-duration-300 hover:tw-bg-gold-600/10" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`${getRoleIcon(user.role)} tw-text-gold-600`}></i>
        <i className={`fas fa-chevron-down tw-text-gold-600 tw-transition-transform tw-duration-300 ${isOpen ? 'rotated tw-rotate-180' : ''}`}></i>
      </button>
      
      {isOpen && (
        <div className="user-dropdown active tw-absolute tw-top-full tw-right-0 tw-bg-white tw-rounded-lg tw-shadow-luxury tw-border tw-border-gold-600/20 tw-py-2 tw-min-w-48">
          {/* User info hidden */}
          
          <hr className="dropdown-divider tw-border-gold-600/20 tw-my-2" />
          
          <Link to="/dashboard" className="dropdown-item tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2 tw-text-luxury-800 tw-transition-all tw-duration-300 hover:tw-bg-gold-600/10 hover:tw-text-gold-600" onClick={() => setIsOpen(false)}>
            <i className="fas fa-tachometer-alt tw-w-4 tw-text-center"></i>
            <span className="tw-font-sans tw-font-medium tw-text-sm">Dashboard</span>
          </Link>
          
          {hasPermission('basic_admin') && (
            <Link to="/admin" className="dropdown-item tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2 tw-text-luxury-800 tw-transition-all tw-duration-300 hover:tw-bg-gold-600/10 hover:tw-text-gold-600" onClick={() => setIsOpen(false)}>
              <i className="fas fa-cog tw-w-4 tw-text-center"></i>
              <span className="tw-font-sans tw-font-medium tw-text-sm">Admin Portal</span>
            </Link>
          )}
          
          {hasPermission('basic_admin') && hasPermission('manage_users') && (
            <button className="dropdown-item tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2 tw-text-luxury-800 tw-transition-all tw-duration-300 hover:tw-bg-gold-600/10 hover:tw-text-gold-600 tw-w-full tw-text-left tw-border-none tw-bg-transparent" onClick={(e) => { e.preventDefault(); handleManageUsers(); }}>
              <i className="fas fa-users-cog tw-w-4 tw-text-center"></i>
              <span className="tw-font-sans tw-font-medium tw-text-sm">Manage Users</span>
            </button>
          )}
          
          {hasPermission('basic_admin') && hasPermission('view_activity_logs') && (
            <button className="dropdown-item tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2 tw-text-luxury-800 tw-transition-all tw-duration-300 hover:tw-bg-gold-600/10 hover:tw-text-gold-600 tw-w-full tw-text-left tw-border-none tw-bg-transparent" onClick={(e) => { e.preventDefault(); handleViewLogs(); }}>
              <i className="fas fa-history tw-w-4 tw-text-center"></i>
              <span className="tw-font-sans tw-font-medium tw-text-sm">Activity Logs</span>
            </button>
          )}
          
          <hr className="dropdown-divider tw-border-gold-600/20 tw-my-2" />
          
          <button className="dropdown-item tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2 tw-text-red-600 tw-transition-all tw-duration-300 hover:tw-bg-red-50 hover:tw-text-red-700 tw-w-full tw-text-left tw-border-none tw-bg-transparent" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt tw-w-4 tw-text-center"></i>
            <span className="tw-font-sans tw-font-medium tw-text-sm">Logout</span>
          </button>
        </div>
      )}

      {/* User Management Modal */}
      <UserManagement 
        isOpen={showUserManagement}
        onClose={() => setShowUserManagement(false)}
      />
      
      {/* Activity Logs Modal */}
      <ActivityLogs 
        isOpen={showActivityLogs}
        onClose={() => setShowActivityLogs(false)}
      />
    </div>
  );
};

export default UserMenu; 