import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 border-t bg-surface-950 text-surface-300 border-white/5">
      <div className="container grid grid-cols-1 gap-12 mx-auto mb-16 md:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-display">OneKey</span>
          </div>
          <p className="max-w-xs text-sm font-light leading-relaxed text-surface-400">
            Bridging generations through the universal language of music. A student-driven non-profit organization dedicated to community service.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="transition-colors duration-300 text-surface-500 hover:text-primary-300">
              <Instagram size={20} />
            </a>
            <a href="mailto:on3keymusic@gmail.com" className="transition-colors duration-300 text-surface-500 hover:text-primary-300">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-8 text-lg font-medium tracking-wide text-white font-display">Quick Links</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><Link to="/about" className="transition-colors duration-300 text-surface-400 hover:text-primary-300">Our Story</Link></li>
            <li><Link to="/team" className="transition-colors duration-300 text-surface-400 hover:text-primary-300">Meet the Team</Link></li>
            <li><Link to="/timeline" className="transition-colors duration-300 text-surface-400 hover:text-primary-300">Events & Timeline</Link></li>
            <li><Link to="/admin" className="transition-colors duration-300 text-surface-400 hover:text-primary-300">Volunteer Portal</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-8 text-lg font-medium tracking-wide text-white font-display">Contact Us</h4>
          <ul className="space-y-6 text-sm font-light">
            <li className="flex items-start space-x-4">
              <MapPin size={18} className="text-primary-300 mt-0.5 shrink-0" />
              <span className="text-surface-400">4799 Vanguard Road, Unit 301<br />Richmond, BC</span>
            </li>
            <li className="flex items-center space-x-4">
              <Mail size={18} className="text-primary-300 shrink-0" />
              <span className="text-surface-400">on3keymusic@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-8 text-lg font-medium tracking-wide text-white font-display">Stay Updated</h4>
          <p className="mb-6 text-sm font-light text-surface-400">Subscribe to our newsletter for upcoming events.</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-0 py-3 text-sm font-light text-white transition-all bg-transparent border-b border-surface-700 focus:outline-none focus:border-primary-300 placeholder-surface-600"
            />
            <button type="submit" className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors duration-300 text-primary-300 hover:text-white group">
              Subscribe <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-between pt-8 mx-auto text-xs font-light text-center border-t border-surface-900 text-surface-600 md:flex-row">
        <p>&copy; {new Date().getFullYear()} OneKey Organization. All rights reserved.</p>
        <Link to="/admin" className="mt-4 transition-colors cursor-pointer text-surface-800 hover:text-surface-600 md:mt-0">
          Admin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;