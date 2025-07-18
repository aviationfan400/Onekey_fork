import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore, User } from '../../store/authStore';
import UserManagement from './UserManagement';
import ActivityLogs from './ActivityLogs';
import Dashboard from './Dashboard';

interface UserMenuProps {
  user: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { logout, hasPermission } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

  const handleDashboard = () => {
    setShowDashboard(true);
    setIsOpen(false);
  };

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'super_admin':
        return 'fas fa-user-cog';
      case 'admin':
        return 'fas fa-shield-alt';
      default:
        return 'fas fa-user';
    }
  };

  const getDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.username;
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button 
        className="user-btn" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={getRoleIcon(user.role)}></i>
        <span className="user-name">{getDisplayName()}</span>
        <i className={`fas fa-chevron-down ${isOpen ? 'rotated' : ''}`}></i>
      </button>
      
      {isOpen && (
        <div className="user-dropdown active">
          <div className="dropdown-header">
            <strong>{user.username}</strong>
            <small>{user.email}</small>
          </div>
          
          <hr className="dropdown-divider" />
          
          <button className="dropdown-item" onClick={(e) => { e.preventDefault(); handleDashboard(); }}>
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </button>
          
          {hasPermission('manage_users') && (
            <button className="dropdown-item" onClick={(e) => { e.preventDefault(); handleManageUsers(); }}>
              <i className="fas fa-users-cog"></i>
              Manage Users
            </button>
          )}
          
          {hasPermission('view_activity_logs') && (
            <button className="dropdown-item" onClick={(e) => { e.preventDefault(); handleViewLogs(); }}>
              <i className="fas fa-history"></i>
              Activity Logs
            </button>
          )}
          
          <hr className="dropdown-divider" />
          
          <button className="dropdown-item" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
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
      
      {/* Dashboard Modal */}
      <Dashboard 
        isOpen={showDashboard}
        onClose={() => setShowDashboard(false)}
      />
    </div>
  );
};

export default UserMenu; 