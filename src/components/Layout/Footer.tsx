import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 overflow-hidden bg-gradient-to-br from-surface-900 via-surface-950 to-surface-900">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
      
      {/* Glassmorphic top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent"></div>
      
      <div className="container relative z-10 grid grid-cols-1 gap-8 mx-auto mb-10 md:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white font-display bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">OneKey</span>
          </div>
          <p className="max-w-xs text-xs font-light leading-relaxed text-surface-300/90">
            Bridging generations through the universal language of music. A student-driven non-profit organization dedicated to community service.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="p-1.5 transition-all duration-300 rounded-lg bg-white/5 text-surface-400 hover:bg-primary-500/20 hover:text-primary-300 backdrop-blur-sm border border-white/10 hover:border-primary-400/30">
              <Instagram size={16} />
            </a>
            <a href="mailto:on3keymusic@gmail.com" className="p-1.5 transition-all duration-300 rounded-lg bg-white/5 text-surface-400 hover:bg-primary-500/20 hover:text-primary-300 backdrop-blur-sm border border-white/10 hover:border-primary-400/30">
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-base font-medium tracking-wide text-white/90 font-display">Quick Links</h4>
          <ul className="space-y-2 text-xs font-light">
            <li><Link to="/about" className="transition-all duration-300 text-surface-300/80 hover:text-primary-300 hover:translate-x-1 inline-block">Our Story</Link></li>
            <li><Link to="/team" className="transition-all duration-300 text-surface-300/80 hover:text-primary-300 hover:translate-x-1 inline-block">Meet the Team</Link></li>
            <li><Link to="/timeline" className="transition-all duration-300 text-surface-300/80 hover:text-primary-300 hover:translate-x-1 inline-block">Events & Timeline</Link></li>
            <li><Link to="/admin" className="transition-all duration-300 text-surface-300/80 hover:text-primary-300 hover:translate-x-1 inline-block">Volunteer Portal</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-4 text-base font-medium tracking-wide text-white/90 font-display">Contact Us</h4>
          <ul className="space-y-3 text-xs font-light">
            <li className="flex items-start space-x-2 group">
              <div className="p-1.5 rounded-lg bg-primary-500/10 border border-primary-400/20">
                <MapPin size={12} className="text-primary-300 shrink-0" />
              </div>
              <span className="text-surface-300/80 group-hover:text-surface-200 transition-colors">4799 Vanguard Road, Unit 301<br />Richmond, BC</span>
            </li>
            <li className="flex items-center space-x-2 group">
              <div className="p-1.5 rounded-lg bg-primary-500/10 border border-primary-400/20">
                <Mail size={12} className="text-primary-300 shrink-0" />
              </div>
              <span className="text-surface-300/80 group-hover:text-surface-200 transition-colors">on3keymusic@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="mb-4 text-base font-medium tracking-wide text-white/90 font-display">Stay Updated</h4>
          <p className="mb-3 text-xs font-light text-surface-300/80">Subscribe to our newsletter for upcoming events.</p>
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 text-xs font-light text-white transition-all bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm focus:outline-none focus:border-primary-400/50 focus:bg-white/10 placeholder-surface-500"
              />
            </div>
            <button type="submit" className="w-full px-3 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-primary-500/20 to-amber-500/20 border border-primary-400/30 rounded-lg text-primary-300 hover:from-primary-500/30 hover:to-amber-500/30 hover:border-primary-400/50 hover:shadow-lg hover:shadow-primary-500/20 backdrop-blur-sm group">
              Subscribe <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar with glassmorphic separator */}
      <div className="container relative z-10 mx-auto">
        <div className="h-px mb-4 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="flex flex-col items-center justify-between text-xs font-light text-center text-surface-400/80 md:flex-row">
          <p>&copy; {new Date().getFullYear()} OneKey Organization. All rights reserved.</p>
          <Link to="/admin" className="mt-2 transition-all duration-300 cursor-pointer text-surface-500/60 hover:text-primary-400 md:mt-0">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;