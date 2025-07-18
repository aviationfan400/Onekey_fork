import React from 'react';

const Projects: React.FC = () => {
  return (
    <div className="projects-page">
      <div className="container">
        <h1>Our Projects</h1>
        <p>Discover the various initiatives and programs that OneKey supports in our community.</p>
        
        <div className="projects-grid">
          <div className="project-card">
            <i className="fas fa-music"></i>
            <h3>Senior Home Performances</h3>
            <p>Regular musical performances at local senior living facilities to bring joy and connection.</p>
          </div>
          
          <div className="project-card">
            <i className="fas fa-graduation-cap"></i>
            <h3>Tutoring Program</h3>
            <p>Free homework help and tutoring services for students of all ages in our community.</p>
          </div>
          
          <div className="project-card">
            <i className="fas fa-heart"></i>
            <h3>Charity Fundraisers</h3>
            <p>Organizing events to raise funds for local charities and community organizations.</p>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default Projects; 