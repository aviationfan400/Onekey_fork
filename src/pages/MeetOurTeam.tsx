import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTeamStore } from '../store/teamStore';
import { getRandomPhotos } from '../data/photos';

const MeetOurTeam: React.FC = () => {
  const { getTeamMembersBySection } = useTeamStore();
  const heroImage = useMemo(() => getRandomPhotos(1)[0], []);

  const leadershipMembers = getTeamMembersBySection('leadership');
  const communicationsMembers = getTeamMembersBySection('communications');
  const coordinatorsMembers = getTeamMembersBySection('coordinators');
  const alumniMembers = getTeamMembersBySection('alumni');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');

          const children = entry.target.querySelectorAll(
            '.team-member-card, .alumni-card, .leadership-card, .volunteer-card'
          );
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
      '.team-hero, .leadership-section, .communications-section, .coordinators-section, .alumni-section, .join-team-section'
    );

    animateElements.forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      el.classList.add(`animate-delay-${Math.min(index + 1, 5)}`);
      observer.observe(el);
    });

    // Parallax scrolling for hero background
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroBgImage = document.querySelector('.team-hero .hero-bg-image') as HTMLElement | null;
      const leadershipBgImage = document.querySelector('.leadership-section .leadership-bg-image') as HTMLElement | null;
      const communicatorsBgImage = document.querySelector('.communications-section .communications-bg-image') as HTMLElement | null;
      const coordinatorsBgImage = document.querySelector('.coordinators-section .coordinators-bg-image') as HTMLElement | null;
      
      if (heroBgImage) {
        heroBgImage.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (leadershipBgImage) {
        leadershipBgImage.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (communicatorsBgImage) {
        communicatorsBgImage.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (coordinatorsBgImage) {
        coordinatorsBgImage.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-surface-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-900/50 to-surface-900"></div>
          <img 
            src={heroImage} 
            alt="Team Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Meet Our Team</h1>
          <p className="text-xl text-surface-300 max-w-2xl mx-auto leading-relaxed">
            The passionate students and volunteers who bring OneKey's mission to life
          </p>
        </div>
      </section>
  
      {/* Leadership Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">Leadership</h2>
            <p className="text-surface-600">Founders driving OneKey's vision</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipMembers.map((member) => (
              <div key={member.id} className="card overflow-hidden group">
                <div className="aspect-w-3 aspect-h-4 bg-surface-100 relative overflow-hidden">
                  <img 
                    src={`${process.env.PUBLIC_URL}${member.image}`} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-surface-900 mb-1">{member.name}</h3>
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-primary-600 font-medium">{member.role}</span>
                    <span className="text-surface-500">{member.school}</span>
                  </div>
                  <p className="text-surface-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-surface-400 hover:text-primary-600 transition-colors"
                    >
                      <i className="fab fa-instagram text-xl" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/* Communications Section */}
      <section className="py-24 bg-surface-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">Communications</h2>
            <p className="text-surface-600">Managing outreach and community connections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communicationsMembers.map((member) => (
              <div key={member.id} className="card overflow-hidden group">
                <div className="aspect-w-3 aspect-h-4 bg-surface-100 relative overflow-hidden">
                  <img 
                    src={`${process.env.PUBLIC_URL}${member.image}`} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-surface-900 mb-1">{member.name}</h3>
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-primary-600 font-medium">{member.role}</span>
                    <span className="text-surface-500">{member.school}</span>
                  </div>
                  <p className="text-surface-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/* Coordinators Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">Coordinators</h2>
            <p className="text-surface-600">Leading our educational and musical programs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coordinatorsMembers.map((member) => (
              <div key={member.id} className="card overflow-hidden group">
                <div className="aspect-w-3 aspect-h-4 bg-surface-100 relative overflow-hidden">
                  <img 
                    src={`${process.env.PUBLIC_URL}${member.image}`} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-surface-900 mb-1">{member.name}</h3>
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-primary-600 font-medium">{member.role}</span>
                    <span className="text-surface-500">{member.school}</span>
                  </div>
                  <p className="text-surface-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/* Alumni Section */}
      <section className="py-24 bg-surface-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">Alumni</h2>
            <p className="text-surface-600">Founding members who continue to inspire our mission</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {alumniMembers.map((member) => (
              <div key={member.id} className="card overflow-hidden group">
                <div className="aspect-w-1 aspect-h-1 bg-surface-100 relative overflow-hidden">
                  {member.image ? (
                    <img 
                      src={`${process.env.PUBLIC_URL}${member.image}`} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-200 text-surface-400">
                      <i className="fas fa-user text-4xl" />
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-surface-900 mb-1">{member.name}</h3>
                  <div className="text-sm text-primary-600 font-medium mb-2">{member.role}</div>
                  <div className="text-xs text-surface-500">{member.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/* Join Our Team Section */}
      <section className="py-24 bg-surface-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl text-surface-300 mb-12">
              Ready to make a difference? OneKey is always looking for passionate students.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: 'music', title: 'Musicians', desc: 'Share your musical talents with senior residents.' },
                { icon: 'graduation-cap', title: 'Tutors', desc: 'Help students succeed academically.' },
                { icon: 'users', title: 'Leaders', desc: 'Take on leadership roles and help expand impact.' }
              ].map((item, index) => (
                <div key={index} className="bg-surface-800 p-6 rounded-xl border border-surface-700">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl">
                    <i className={`fas fa-${item.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-surface-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Link to="/about" className="btn-primary">
                About Us
              </Link>
              <a href="mailto:on3keymusic@gmail.com" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-surface-900">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetOurTeam;