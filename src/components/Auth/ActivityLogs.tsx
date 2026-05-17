import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { format } from 'date-fns';

interface ActivityLogsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ActivityLogs: React.FC<ActivityLogsProps> = ({ isOpen, onClose }) => {
  const { activityLogs, users, hasPermission } = useAuthStore();
  const [filter, setFilter] = useState<'all' | 'login' | 'logout' | 'create_user' | 'delete_user' | 'change_role'>('all');

  if (!isOpen || !hasPermission('view_activity_logs')) return null;

  const filteredLogs = filter === 'all' 
    ? activityLogs 
    : activityLogs.filter(log => log.action === filter);

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login': return 'fas fa-sign-in-alt';
      case 'logout': return 'fas fa-sign-out-alt';
      case 'create_user': return 'fas fa-user-plus';
      case 'delete_user': return 'fas fa-user-times';
      case 'change_role': return 'fas fa-user-shield';
      case 'change_status': return 'fas fa-toggle-on';
      case 'change_password': return 'fas fa-key';
      case 'failed_login': return 'fas fa-exclamation-triangle';
      default: return 'fas fa-info-circle';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'login': return '#27ae60';
      case 'logout': return '#3498db';
      case 'create_user': return '#2ecc71';
      case 'delete_user': return '#e74c3c';
      case 'change_role': return '#f39c12';
      case 'failed_login': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  return (
    <div className="modal-overlay active">
      <div className="modal-content" style={{ maxWidth: '900px', maxHeight: '90vh' }}>
        <div className="modal-header">
          <h2>
            <i className="fas fa-history"></i> Activity Logs
          </h2>
          <button className="close-modal" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Enhanced Filter Controls */}
        <div className="activity-filters">
          <div className="filter-group">
            <label>Filter by action:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="filter-select"
            >
              <option value="all">All Activities</option>
              <option value="login">Logins</option>
              <option value="logout">Logouts</option>
              <option value="create_user">User Created</option>
              <option value="delete_user">User Deleted</option>
              <option value="change_role">Role Changes</option>
            </select>
          </div>
          
          <div className="activity-stats">
            <div className="stat-chip">
              <i className="fas fa-list"></i>
              <span>{filteredLogs.length} entries</span>
            </div>
            <div className="stat-chip">
              <i className="fas fa-clock"></i>
              <span>Last 30 days</span>
            </div>
          </div>
        </div>

        {/* Enhanced Activity List */}
        <div className="activity-logs-content">
          {filteredLogs.length === 0 ? (
            <div className="empty-logs">
              <div className="empty-icon">
                <i className="fas fa-search"></i>
              </div>
              <h4>No activities found</h4>
              <p>Try adjusting your filter or check back later for new activity.</p>
            </div>
          ) : (
            <div className="logs-list enhanced">
              {filteredLogs.map((log, index) => (
                <div key={log.id} className="log-entry enhanced">
                  <div className="log-timeline">
                    <div className="timeline-dot" style={{ backgroundColor: getActionColor(log.action) }}>
                      <i className={getActionIcon(log.action)}></i>
                    </div>
                    {index < filteredLogs.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  <div className="log-content">
                    <div className="log-header">
                      <div className="log-title">
                        <strong>{getUserName(log.userId)}</strong>
                        <span className="action-badge" style={{ backgroundColor: getActionColor(log.action) + '20', color: getActionColor(log.action) }}>
                          {log.action.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="log-time">
                        {format(new Date(log.timestamp), 'MMM dd, HH:mm')}
                      </span>
                    </div>
                    <div className="log-description">
                      {log.details}
                    </div>
                    {log.ipAddress && (
                      <div className="log-meta">
                        <i className="fas fa-globe"></i>
                        <span>IP: {log.ipAddress}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs; 