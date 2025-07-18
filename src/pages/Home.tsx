import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/pics/Slide_1.jpg',
      title: 'Welcome to OneKey',
      subtitle: 'Making a difference through music and community service'
    },
    {
      image: '/pics/Slide_2.jpg',
      title: 'Student Volunteers',
      subtitle: 'Passionate young people creating positive change'
    },
    {
      image: '/pics/Slide_3.JPG',
      title: 'Community Impact',
      subtitle: 'Building connections across generations'
    },
    {
      image: '/pics/Slide_4.JPG',
      title: 'Join Our Mission',
      subtitle: 'Be part of something meaningful'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // edit here to change the time of the slide

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="home-page">
      {/* Hero Slideshow Section */}
      <section className="hero-slideshow">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
          
          <button className="nav-btn prev" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="nav-btn next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="container">
          <div className="welcome-content">
            <h2>Welcome to OneKey</h2>
            <p>
              OneKey is a student-driven organization dedicated to making a positive impact 
              in our community through music, education, and service. Our mission is to unlock 
              the potential of young people and foster meaningful connections across generations.
            </p>
            <div className="welcome-features">
              <div className="feature">
                <i className="fas fa-music"></i>
                <h3>Music Performances</h3>
                <p>Bringing joy through live performances at senior homes and community events.</p>
              </div>
              <div className="feature">
                <i className="fas fa-graduation-cap"></i>
                <h3>Educational Support</h3>
                <p>Providing tutoring and homework help to students of all ages.</p>
              </div>
              <div className="feature">
                <i className="fas fa-heart"></i>
                <h3>Community Service</h3>
                <p>Organizing charity events and volunteer opportunities for meaningful impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <div className="container">
          <h2>Get Involved</h2>
          <div className="quick-links">
            <a href="/timeline" className="quick-link">
              <i className="fas fa-calendar-alt"></i>
              <h3>Upcoming Events</h3>
              <p>See our latest performances and volunteer opportunities</p>
            </a>
            <a href="/get-involved" className="quick-link">
              <i className="fas fa-hands-helping"></i>
              <h3>Volunteer</h3>
              <p>Join our team and make a difference in your community</p>
            </a>
            <a href="/contact" className="quick-link">
              <i className="fas fa-envelope"></i>
              <h3>Contact Us</h3>
              <p>Get in touch to learn more about our mission</p>
            </a>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home; 