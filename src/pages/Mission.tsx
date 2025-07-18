import React from 'react';

const Mission: React.FC = () => {
  return (
    <div className="mission-page">
      <div className="container">
        <h1>Our Mission</h1>
        <p>Empowering students to make a positive impact through music, education, and community service.</p>
        
        <div className="mission-content">
          <div className="mission-statement">
            <h2>Mission Statement</h2>
            <p>
              OneKey exists to unlock the potential of young people by providing meaningful 
              opportunities to serve their community through music performances, educational 
              support, and charitable initiatives. We believe in the power of youth to create 
              positive change and foster connections across generations.
            </p>
          </div>
          
          <div className="vision-statement">
            <h2>Vision</h2>
            <p>
              A community where students are empowered to be leaders, where music brings joy 
              and healing, and where service creates lasting bonds between people of all ages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission; 