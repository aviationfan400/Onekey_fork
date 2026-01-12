import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTimelineStore, TimelineEvent } from '../store/timelineStore';
import { apiService } from '../services/firebaseService';
import { format } from 'date-fns';
import Slideshow from '../components/Slideshow';
import { getRandomPhotos } from '../data/photos';
// Test functions removed

const Timeline: React.FC = () => {
  const heroImages = React.useMemo(() => getRandomPhotos(5), []);
  const [activeTab, setActiveTab] = useState<'performances' | 'homework' | 'charity'>('performances');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  
  const { isAuthenticated, user, hasPermission } = useAuthStore();
  const { addEvent, removeEvent, getEventsByCategory, events, fetchEvents } = useTimelineStore();
  
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    category: 'performances' as TimelineEvent['category'],
    location: '',
    time: '',
    attendees: '',
    performers: '',
    duration: '',
    description: '',
    photos: [] as File[]
  });

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Debug: Check localStorage and events on component mount
  useEffect(() => {
    console.log('Timeline component mounted');
    console.log('Current events from store:', events);
    console.log('Events in localStorage:', localStorage.getItem('onekey-timeline'));
    
    // Data loss check removed
    
    // Check if events are being loaded from localStorage
    const storedData = localStorage.getItem('onekey-timeline');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        console.log('Parsed localStorage data:', parsed);
        
        // If we have events in localStorage but not in store, there might be a hydration issue
        if (parsed.state?.events?.length > 0 && events.length === 0) {
          console.log('WARNING: Events found in localStorage but not in store!');
          console.log('localStorage events:', parsed.state.events.length);
          console.log('Store events:', events.length);
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
    
    // Force a store refresh to ensure hydration
    const checkStore = () => {
      const currentEvents = getEventsByCategory(activeTab);
      console.log('Current events after hydration check:', currentEvents.length);
    };
    
    // Check after a short delay to allow hydration
    setTimeout(checkStore, 500);
  }, [events, activeTab, getEventsByCategory]);

  // Smooth scrolling animations - Constance style
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother class addition
          window.requestAnimationFrame(() => {
            entry.target.classList.add('animate');
            
            // Add staggered animations for child elements
            const children = entry.target.querySelectorAll('.timeline-item, .filter-btn, .timeline-event-card');
            children.forEach((child, index) => {
              // Use CSS custom properties for delay instead of setTimeout if possible, 
              // but keeping setTimeout for now as it's logic-based. 
              // Optimized to batch if needed, but simple timeout is okay for small lists.
              setTimeout(() => {
                child.classList.add('animate');
              }, index * 50); // Reduced delay for snappier feel
            });
          });
          
          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Add animation classes to sections
    const animateElements = document.querySelectorAll('.timeline-hero, .timeline-filters, .timeline-content-section');
    
    animateElements.forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      el.classList.add(`animate-delay-${Math.min(index + 1, 5)}`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'performances', label: 'Performances', icon: 'fas fa-music' },
    { id: 'homework', label: 'Homework Help', icon: 'fas fa-graduation-cap' },
    { id: 'charity', label: 'Charity Events', icon: 'fas fa-heart' }
  ];

  const currentEvents = React.useMemo(() => getEventsByCategory(activeTab), [activeTab, getEventsByCategory]);

  // Debug: Log current events being displayed
  console.log('Current events for category', activeTab, ':', currentEvents);
  console.log('Total events in store:', events.length);

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

    const createEvent = async () => {
      try {
        let photoUrls: string[] = [];

        // Upload photos to Firebase Storage if present
        if (formData.photos.length > 0) {
          console.log('Uploading photos to Firebase Storage...', formData.photos.length, 'files');
          for (const photo of formData.photos) {
            const response = await apiService.uploadImage(photo);
            if (response.success && response.data) {
              photoUrls.push(response.data.filePath);
              console.log('Photo uploaded successfully:', response.data.filename);
            } else {
              console.error('Failed to upload photo:', response.error);
            }
          }
          console.log('Photos uploaded successfully:', photoUrls.length, 'photos');
        }

        const newEvent = await addEvent({
          ...formData,
          photo: photoUrls[0] || null, // Keep first photo as main photo for now
          photos: photoUrls, // Store all photo URLs
          createdBy: user.id
        });

        console.log('Event created with photos:', newEvent?.photo ? 'Yes' : 'No', 'Total photos:', photoUrls.length);

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
          description: '',
          photos: []
        });
      } catch (error) {
        console.error('Error creating event:', error);
        alert('Failed to create event');
      }
    };

    createEvent();
  };


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        photos: fileArray
      }));
    }
  };

  const handleDelete = async (eventId: string) => {
    await removeEvent(eventId);
    setShowConfirmDelete(null);
  };

  const canManageEvents = isAuthenticated && user && hasPermission('manage_timeline');

  // Debug logging
  console.log('Timeline Debug:', {
    isAuthenticated,
    user: user?.username,
    userRole: user?.role,
    hasPermission: hasPermission('manage_timeline'),
    canManageEvents,
    showAddModal,
    formDataPhotos: formData.photos.length
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-surface-900">
        <div className="absolute inset-0 z-0">
          <Slideshow 
            images={heroImages} 
            interval={5000} 
            overlay={true} 
          />
        </div>
        
        <div className="container relative z-10 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl drop-shadow-lg">Our Timeline</h1>
          <p className="max-w-2xl mx-auto text-xl leading-relaxed text-white/90 drop-shadow-md">
            Explore our journey of community service, performances, and educational initiatives
          </p>
        </div>
      </section>

      {/* Timeline Filters Section */}
      <section className="sticky z-40 py-12 bg-white border-b shadow-sm border-surface-100 top-20">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex w-full gap-4 pb-2 overflow-x-auto md:pb-0 md:w-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === category.id 
                      ? 'bg-primary-600 text-white shadow-md' 
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                  onClick={() => handleTabChange(category.id as typeof activeTab)}
                >
                  <i className={`${category.icon} mr-2`}></i>
                  {category.label}
                </button>
              ))}
            </div>

            {/* Admin Controls */}
            {canManageEvents && (
              <button 
                className="flex items-center gap-2 px-4 py-2 text-sm btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <i className="fas fa-plus"></i>
                Add New Event
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Content Section */}
      <section className="py-24 bg-surface-50">
        <div className="container max-w-4xl">
          {currentEvents.length === 0 ? (
            <div className="py-20 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-3xl rounded-full bg-surface-200 text-surface-400">
                <i className={categories.find(c => c.id === activeTab)?.icon}></i>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-surface-900">Coming Soon</h3>
              <p className="text-surface-600">{categories.find(c => c.id === activeTab)?.label} events will be added here soon!</p>
            </div>
          ) : (
            <div className="relative space-y-12 before:absolute before:left-8 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-surface-200">
              {currentEvents.map((event, index) => (
                <div key={event.id} className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Date Bubble */}
                  <div className="absolute z-10 w-4 h-4 mt-6 transform -translate-x-1/2 border-4 border-white rounded-full shadow-sm left-8 md:left-1/2 bg-primary-600"></div>
                  
                  {/* Content */}
                  <div className="flex-1 ml-16 md:ml-0">
                    <div className="p-6 transition-shadow bg-white border shadow-sm rounded-2xl border-surface-100 hover:shadow-md">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="block mb-1 text-sm font-bold tracking-wider uppercase text-primary-600">
                            {format(new Date(event.date), 'MMMM d, yyyy')}
                          </span>
                          <h3 className="text-xl font-bold text-surface-900">{event.name}</h3>
                        </div>
                        {canManageEvents && (
                          <button 
                            className="transition-colors text-surface-400 hover:text-red-500"
                            onClick={() => setShowConfirmDelete(event.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>

                      {event.photo && (
                        <div className="mb-6 overflow-hidden border rounded-xl bg-surface-50 border-surface-100">
                          <img 
                            src={event.photo} 
                            alt={event.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto max-h-[300px] object-contain"
                            onError={(e) => {
                              const container = e.currentTarget.parentElement;
                              if (container) container.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-surface-600">
                        {event.location && (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-map-marker-alt text-primary-500"></i> 
                            {event.location}
                          </span>
                        )}
                        {event.time && (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-clock text-primary-500"></i> 
                            {event.time}
                          </span>
                        )}
                      </div>

                      {event.description && (
                        <p className="mb-4 leading-relaxed text-surface-600">{event.description}</p>
                      )}

                      <div className="flex gap-4 pt-4 text-sm font-medium border-t border-surface-100 text-surface-500">
                        {event.category !== 'homework' && event.attendees && (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-users"></i> 
                            {event.attendees} attendees
                          </span>
                        )}
                        {event.category !== 'homework' && event.performers && (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-music"></i> 
                            {event.performers} performers
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty space for the other side */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="modal-overlay active">
          <div className="modal-content timeline-modal">
            <div className="modal-header">
              <h2>Add New Event</h2>
              <button 
                className="close-modal"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="timeline-form">
              <div className="form-row">
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
              </div>
              
              <div className="form-row">
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
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                  />
                </div>
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
              
              {formData.category !== 'homework' && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="attendees">Expected Attendees</label>
                    <input
                      type="number"
                      id="attendees"
                      name="attendees"
                      value={formData.attendees}
                      onChange={handleFormChange}
                      min="0"
                      placeholder="Enter number of attendees"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="performers">Performers</label>
                    <input
                      type="number"
                      id="performers"
                      name="performers"
                      value={formData.performers}
                      onChange={handleFormChange}
                      min="0"
                      placeholder="Enter number of performers"
                    />
                  </div>
                </div>
              )}
              
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
              
              {/* Photo Upload Section */}
              <div className="form-group" style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #c4ae7b' }}>
                <label htmlFor="photo" style={{ fontWeight: '600', color: '#333', fontSize: '1rem', marginBottom: '0.5rem', display: 'block' }}>
                  EVENT PHOTO(S)
                </label>
                <div style={{
                  border: '2px dashed #c4ae7b',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: '#ffffff',
                  marginTop: '0.5rem'
                }}>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    style={{ 
                      display: 'none'
                    }}
                  />
                  <label 
                    htmlFor="photo"
                    style={{
                      display: 'inline-block',
                      padding: '0.75rem 1.5rem',
                      background: '#c4ae7b',
                      color: 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#b39a6a';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#c4ae7b';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }}
                  >
                    Choose Files
                  </label>
                  <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                    Select image files (JPG, PNG, GIF) - Multiple files allowed
                  </p>
                </div>
                {formData.photos.length > 0 && (
                  <div className="photo-preview" style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#ffffff',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#666' }}>
                      Photo Preview ({formData.photos.length} file{formData.photos.length > 1 ? 's' : ''} selected):
                    </p>
                    <img 
                      src={URL.createObjectURL(formData.photos[0])} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '250px', 
                        maxHeight: '180px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    {formData.photos.length > 1 && (
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#666' }}>
                        +{formData.photos.length - 1} more photo{formData.photos.length > 2 ? 's' : ''}
                      </p>
                    )}
                  </div>
                )}
                <small style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', textAlign: 'center' }}>
                  Adding a photo helps make your event more engaging
                </small>
              </div>

              <button type="submit" className="timeline-submit-btn">
                <i className="fas fa-plus"></i>
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="modal-overlay active">
          <div className="modal-content timeline-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button 
                className="close-modal"
                onClick={() => setShowConfirmDelete(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <p>Are you sure you want to delete this event? This action cannot be undone.</p>
            </div>
            
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

      {/* Photos Link */}
      <section className="timeline-photos-link" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <a
            href="https://drive.google.com/drive/u/0/folders/1SASLgBECg8h7-37JtEGAVDpu0_5hwyHZ"
            target="_blank"
            rel="noopener noreferrer"
            className="photos-access-link"
            style={{ fontSize: '1.15rem', fontWeight: 700, textDecoration: 'underline', color: '#2b2b2b' }}
            aria-label="Open photos in Google Drive (opens in a new tab)"
          >
            Click here to access photos!!
          </a>
        </div>
      </section>
    </div>
  );
};

export default Timeline; 