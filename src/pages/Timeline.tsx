import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTimelineStore, TimelineEvent } from '../store/timelineStore';
import { format } from 'date-fns';

const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performances' | 'homework' | 'charity'>('performances');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  
  const { isAuthenticated, user } = useAuthStore();
  const { addEvent, removeEvent, getEventsByCategory } = useTimelineStore();
  
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    category: 'performances' as TimelineEvent['category'],
    location: '',
    time: '',
    attendees: '',
    performers: '',
    duration: '',
    description: ''
  });

  const categories = [
    { id: 'performances', label: 'Performances', icon: 'fas fa-music' },
    { id: 'homework', label: 'Homework Help', icon: 'fas fa-graduation-cap' },
    { id: 'charity', label: 'Charity Events', icon: 'fas fa-heart' }
  ];

  const currentEvents = getEventsByCategory(activeTab);

  const handleTabChange = (category: typeof activeTab) => {
    setActiveTab(category);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newEvent = addEvent({
      ...formData,
      category: formData.category,
      createdBy: user.id
    });

    setShowAddModal(false);
    setFormData({
      name: '',
      date: '',
      category: 'performances',
      location: '',
      time: '',
      attendees: '',
      performers: '',
      duration: '',
      description: ''
    });
  };

  const handleDelete = (eventId: string) => {
    removeEvent(eventId);
    setShowConfirmDelete(null);
  };

  const canManageEvents = isAuthenticated && user && ['admin', 'super_admin'].includes(user.role);

  return (
    <div className="timeline-page">
      <div className="container">
        <header className="timeline-header">
          <h1>Our Timeline</h1>
          <p>Explore our journey of community service, performances, and educational initiatives.</p>
        </header>

        {/* Admin Controls */}
        {canManageEvents && (
          <div className="admin-controls">
            <button 
              className="add-event-btn"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fas fa-plus"></i>
              Add New Event
            </button>
          </div>
        )}

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => handleTabChange(category.id as typeof activeTab)}
            >
              <i className={category.icon}></i>
              {category.label}
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="timeline-content">
          {currentEvents.length === 0 ? (
            <div className="empty-state">
              <i className={categories.find(c => c.id === activeTab)?.icon}></i>
              <p>{categories.find(c => c.id === activeTab)?.label} events will be added here soon!</p>
            </div>
          ) : (
            <div className="timeline-list">
              {currentEvents.map(event => (
                <div key={event.id} className="timeline-item">
                  <div className="timeline-date">
                    <span className="month">{format(new Date(event.date), 'MMM')}</span>
                    <span className="day">{format(new Date(event.date), 'd')}</span>
                    <span className="year">{format(new Date(event.date), 'yyyy')}</span>
                  </div>
                  
                  <div className="timeline-icon">
                    <i className={categories.find(c => c.id === event.category)?.icon}></i>
                  </div>
                  
                  <div className="timeline-content-item">
                    <div className="event-header">
                      <h3>{event.name}</h3>
                      {canManageEvents && (
                        <button 
                          className="delete-event-btn"
                          onClick={() => setShowConfirmDelete(event.id)}
                        >
                          <i className="fas fa-trash"></i>
                          Remove
                        </button>
                      )}
                    </div>
                    
                    {event.location && (
                      <p className="event-location">
                        <i className="fas fa-map-marker-alt"></i> 
                        {event.location}
                      </p>
                    )}
                    
                    {event.time && (
                      <p className="event-time">
                        <i className="fas fa-clock"></i> 
                        {event.time}
                      </p>
                    )}
                    
                    {event.description && (
                      <p className="event-description">{event.description}</p>
                    )}
                    
                    <div className="event-details">
                      {event.attendees && (
                        <span className="detail-item">
                          <i className="fas fa-users"></i> 
                          {event.attendees} attendees
                        </span>
                      )}
                      {event.performers && (
                        <span className="detail-item">
                          <i className="fas fa-user-friends"></i> 
                          {event.performers} {event.category === 'homework' ? 'volunteers' : 'performers'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Event</h2>
              <button 
                className="close-modal"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Event Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="performances">Performances</option>
                  <option value="homework">Homework Help</option>
                  <option value="charity">Charity Events</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="attendees">Expected Attendees</label>
                <input
                  type="text"
                  id="attendees"
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="performers">
                  {formData.category === 'homework' ? 'Volunteers' : 'Performers'}
                </label>
                <input
                  type="text"
                  id="performers"
                  name="performers"
                  value={formData.performers}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={4}
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button 
                className="close-modal"
                onClick={() => setShowConfirmDelete(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <p>Are you sure you want to delete this event? This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowConfirmDelete(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(showConfirmDelete)}
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Timeline; 