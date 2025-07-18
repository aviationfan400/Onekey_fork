import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <section className="intro">
        <div className="container">
          <div className="intro-content">
            <h1>About OneKey</h1>
            <p>
              OneKey is a student-driven organization dedicated to making a positive impact 
              in our community through music, education, and service. Our mission is to unlock 
              the potential of young people and foster meaningful connections across generations.
            </p>
            <div className="intro-accent"></div>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <div className="story-container">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2023 by a group of passionate students, OneKey began as a small 
                initiative to bring music and joy to local senior homes. Over time, our team 
                has grown, and so has our impact. Today, we organize performances and tutoring 
                sessions for people of all ages.
              </p>
              <p>
                We believe that everyone has something valuable to share, and we strive to 
                create opportunities for students to give back to the community, while earning{' '}
                <span className="highlight">volunteer hours</span>. Our volunteers come from 
                diverse backgrounds, united by a common goal: to make a difference, one person at a time.
              </p>
            </div>
            <div className="story-visual">
              <div className="story-image-placeholder">
                <i className="fas fa-music"></i>
                <span>Building Communities Through Music</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-banner">
        <div className="container">
          <div className="quote-content">
            <blockquote>
              "Where words fail, music speaks."
            </blockquote>
            <p className="quote-author">– Hans Christian Andersen</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="values-container">
            <h2>Our Impact</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Money Raised</h3>
                <p>
                  We work together, support each other, and celebrate our collective 
                  achievements through fundraising initiatives.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h3>Community Partners</h3>
                <p>
                  We lead with empathy and strive to make a positive impact on everyone 
                  we meet through partnerships.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-seedling"></i>
                </div>
                <h3>Volunteer Hours</h3>
                <p>
                  We encourage learning, curiosity, and personal development for all 
                  our members through service.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Members</h3>
                <p>
                  We believe in building strong, inclusive communities where everyone 
                  belongs and can contribute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="container">
          <div className="join-content">
            <h2>Join Us</h2>
            <p>
              Interested in volunteering, performing, or supporting our mission? We welcome 
              new members and partners! Reach out to us to learn more about how you can get 
              involved with OneKey.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button">
                <i className="fas fa-envelope"></i>
                Contact Us
              </Link>
              <Link to="/get-involved" className="cta-button secondary">
                <i className="fas fa-hands-helping"></i>
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default About; 