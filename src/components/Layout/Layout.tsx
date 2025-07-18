import React from 'react';
import Navigation from './Navigation';
import BackgroundAnimation from './BackgroundAnimation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <BackgroundAnimation />
      <Navigation />
      <main className="transition-fade">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout; 