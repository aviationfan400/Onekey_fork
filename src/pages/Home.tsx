import React, { useEffect, useState } from 'react';
import { getCurrentMonthYear } from '../utils/dateUtils';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/Onekey/pics/Slide_1.jpg',
      title: 'OneKey',
      subtitle: 'Student volunteers making a difference through music and community service'
    },
    {
      image: '/Onekey/pics/Slide_2.jpg',
      title: 'Our Mission',
      subtitle: 'Bridging generations through the universal language of music'
    },
    {
      image: '/Onekey/pics/Slide_3.JPG',
      title: 'Community Impact',
      subtitle: 'Creating lasting connections across our community'
    }
  ];

  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    // Hero section parallax (background images)
    const heroSlides = document.querySelectorAll('.hero-slide') as NodeListOf<HTMLElement>;
    heroSlides.forEach((slide) => {
      slide.style.transform = `translateY(${scrollY * 0.3}px)`;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Add scroll event listener for parallax
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-new">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slideshow">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section
      <section className="philosophy-section">
        <div className="container">
          <div className="section-header">
            <h2>OUR PHILOSOPHY</h2>
          </div>
          
          <div className="philosophy-content">
            <div className="philosophy-item">
              <h3>Our DNA</h3>
              <p className="highlight">A genuine passion for music and community service.</p>
              <p>It is where we come from, our student heritage. We believe that our passion allows us to create connections.</p>
            </div>
            
            <div className="philosophy-item">
              <h3>Our Ambition</h3>
              <p className="highlight">Be the reference of student-driven community impact.</p>
              <p>Growing while keeping our volunteer spirit.</p>
            </div>
            
            <div className="philosophy-item">
              <h3>Where we come from</h3>
              <p>OneKey was created in 2020, with music education as the main activity. A clear vision and determination enabled the diversification and progress of our organization.</p>
              <p>In 2021, we took our first step in community service with senior home concerts. This ignited our passion and allowed us to discover our DNA: A genuine passion for bridging generations.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Service Areas Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Service Areas</h2>
            <p>OneKey's activities are structured around 3 Principal Service Areas</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-image">
                <img src="/Onekey/pics/Slide_2.jpg" alt="Music Services" />
              </div>
              <div className="service-content">
                <h3>Music</h3>
                <p>Senior home concerts and community performances bringing joy through music</p>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="/Onekey/pics/Slide_3.JPG" alt="Education Services" />
              </div>
              <div className="service-content">
                <h3>Education</h3>
                <p>Tutoring and academic support for students across all grade levels</p>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-image">
                <img src="/Onekey/pics/Slide_4.JPG" alt="Community Services" />
              </div>
              <div className="service-content">
                <h3>Community</h3>
                <p>Fundraising and volunteer opportunities for meaningful community impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="section-header">
            <h2>THE ORGANIZATION IN NUMBERS</h2>
            <p>as of {(() => {
              const date = getCurrentMonthYear();
              console.log('Home component calling getCurrentMonthYear, got:', date);
              return date;
            })()}</p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Years of Impact</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Service Areas</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">85+</div>
              <div className="stat-label">Student Volunteers</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Performances</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">2,500+</div>
              <div className="stat-label">Volunteer Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join OneKey and become part of a student-driven organization dedicated to creating positive change through music, education, and community service.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
