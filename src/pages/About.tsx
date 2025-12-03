import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PhotoGallery from '../components/PhotoGallery';
import { getRandomPhotos } from '../data/photos';

const About: React.FC = () => {
  const heroImage = useMemo(() => getRandomPhotos(1)[0], []);
  const teamImage = useMemo(() => getRandomPhotos(1)[0], []);
  const galleryImages = useMemo(() => getRandomPhotos(9), []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  // Smooth scrolling animations - Constance style
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Add staggered animations for child elements
          const children = entry.target.querySelectorAll('.value-card, .team-member, .milestone-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Add animation classes to sections
    const animateElements = document.querySelectorAll('.about-hero, .philosophy-about, .story-timeline, .leadership-section, .impact-stats, .join-about');
    
    animateElements.forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      el.classList.add(`animate-delay-${Math.min(index + 1, 5)}`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden lg:pt-48 lg:pb-32 bg-surface-900">
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-900/50 to-surface-900"></div>
          <img 
            src={heroImage} 
            alt="About Hero" 
            className="object-cover w-full h-full"
          />
        </motion.div>
        
        <div className="container relative z-10 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">About OneKey</h1>
          <p className="max-w-2xl mx-auto text-xl leading-relaxed text-surface-300">
            A student-driven organization bridging generations through music, education, and community service
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-surface-900">Our Story</h2>
            <p className="text-lg leading-relaxed text-surface-600">
              Where passion meets purpose.
            </p>
          </div>
          
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-6 text-lg leading-relaxed text-surface-600">
              <h3 className="text-2xl font-bold text-surface-900">Where Passion Meets Purpose</h3>
              <p>OneKey was born from a simple belief: that music has the power to bridge generations and create lasting connections in our community.</p>
              <p>Founded in 2020, our organization began as a small initiative to bring musical performances to local senior living facilities. What started as weekend concerts has grown into a comprehensive community service program touching the lives of hundreds of students and seniors alike.</p>
            </div>
            <div className="relative overflow-hidden shadow-xl rounded-2xl">
              <img src={teamImage} alt="OneKey Team" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Timeline */}
      <section className="py-24 bg-surface-50">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-surface-900">Our Journey</h2>
            <p className="text-surface-600">Milestones that shaped our mission</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {[
              { year: '2020', title: 'The Beginning', desc: 'OneKey organizes the first senior home concert with just 5 student volunteers.', tag: 'FOUNDING' },
              { year: '2021', title: 'Program Expansion', desc: 'Launch of weekly concert series across 3 senior facilities.', tag: 'GROWTH' },
              { year: '2022', title: 'Educational Outreach', desc: 'Introduction of tutoring programs, expanding our mission beyond music.', tag: 'EDUCATION' },
              { year: '2023', title: 'Community Recognition', desc: 'Received the Youth Volunteer Excellence Award and began major fundraising.', tag: 'RECOGNITION' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-start gap-8 md:flex-row md:items-center group">
                <div className="w-full text-4xl font-bold transition-colors md:w-32 text-primary-200 group-hover:text-primary-600">
                  {item.year}
                </div>
                <div className="flex-1 p-8 transition-shadow bg-white border shadow-sm rounded-2xl border-surface-100 hover:shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-surface-900">{item.title}</h3>
                    <span className="px-3 py-1 text-xs font-bold tracking-wider rounded-full bg-primary-50 text-primary-700">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-surface-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <PhotoGallery 
            images={galleryImages} 
            title="Meet Our Team" 
          />
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-24 text-white bg-surface-900">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Impact in Numbers</h2>
            <p className="text-surface-400">as at December 2024</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:grid-cols-6">
            {[
              { number: "200+", label: "Seniors Served" },
              { number: "85+", label: "Volunteers" },
              { number: "2.5k+", label: "Hours" },
              { number: "$15k+", label: "Raised" },
              { number: "5", label: "Partners" },
              { number: "150+", label: "Concerts" }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="mb-2 text-3xl font-bold text-primary-400">{stat.number}</div>
                <div className="text-sm font-medium text-surface-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl p-12 mx-auto text-center bg-surface-50 rounded-3xl">
            <h2 className="mb-6 text-3xl font-bold text-surface-900">Ready to Make a Difference?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-surface-600">
              Join OneKey and become part of a student-driven organization that's transforming communities.
            </p>
            <Link to="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 