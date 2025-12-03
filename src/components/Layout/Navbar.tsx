import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Team', path: '/team' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-surface-900/90 backdrop-blur-md py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-display font-bold tracking-tight text-white transition-colors duration-300"
        >
          OneKey
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary-400 ${
                location.pathname === link.path
                  ? 'text-primary-400'
                  : 'text-white/90'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isScrolled
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20'
            }`}
          >
            Get Involved
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-900 border-t border-surface-800 overflow-hidden"
          >
            <div className="container mx-auto py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-display font-medium ${
                    location.pathname === link.path ? 'text-primary-400' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/admin"
                className="inline-block text-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
