import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-stone-950">
      <Navbar />
      <main className={`flex-grow ${isHome ? '' : 'pt-14 md:pt-[4.5rem]'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
