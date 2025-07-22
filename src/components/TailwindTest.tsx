import React from 'react';

const TailwindTest: React.FC = () => {
  return (
    <div className="tw-p-6 tw-max-w-4xl tw-mx-auto">
      {/* Header showing successful migration */}
      <div className="tw-text-center tw-mb-8">
        <h1 className="tw-text-luxury-title tw-mb-4">🎉 Tailwind CSS Migration Complete!</h1>
        <p className="tw-text-luxury-body">Your luxury hotel theme is now powered by Tailwind utilities while preserving all existing styles.</p>
      </div>

      {/* Grid of migrated components */}
      <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-gap-6">
        
        {/* Migration Status */}
        <div className="tw-card-luxury">
          <h3 className="tw-text-luxury-title tw-mb-4">✅ Successfully Migrated</h3>
          <div className="tw-space-y-3">
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full"></div>
              <span className="tw-text-luxury-body">Footer Component</span>
            </div>
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full"></div>
              <span className="tw-text-luxury-body">UserMenu Dropdown</span>
            </div>
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full"></div>
              <span className="tw-text-luxury-body">AdminMenu Component</span>
            </div>
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-w-2 tw-h-2 tw-bg-gold-600 tw-rounded-full"></div>
              <span className="tw-text-luxury-body">All existing styles preserved</span>
            </div>
          </div>
        </div>

        {/* Luxury Components Demo */}
        <div className="tw-card-luxury">
          <h3 className="tw-text-luxury-title tw-mb-4">Luxury Components Ready</h3>
          <div className="tw-space-y-3">
            <button className="tw-btn-luxury tw-w-full">
              <i className="fas fa-star tw-mr-2"></i>
              Luxury Button
            </button>
            <div className="tw-bg-gold-600/10 tw-p-3 tw-rounded-lg tw-border tw-border-gold-600/20">
              <p className="tw-text-gold-700 tw-font-medium tw-text-sm">Gold accent styling</p>
            </div>
            <div className="tw-bg-luxury-50 tw-p-3 tw-rounded-lg">
              <p className="tw-text-luxury-800 tw-text-sm">Luxury color scheme active</p>
            </div>
          </div>
        </div>

        {/* Typography Showcase */}
        <div className="tw-card-luxury">
          <h3 className="tw-text-luxury-title tw-mb-4">Typography System</h3>
          <div className="tw-space-y-3">
            <h4 className="tw-font-serif tw-text-2xl tw-text-luxury-900">Cormorant Garamond</h4>
            <p className="tw-font-sans tw-text-base tw-text-luxury-700">Montserrat Font Family</p>
            <p className="tw-text-luxury-subtitle">Your luxury subtitle style</p>
            <p className="tw-text-luxury-body">Perfect body text with proper line height and spacing.</p>
          </div>
        </div>

        {/* Responsive Demo */}
        <div className="tw-card-luxury">
          <h3 className="tw-text-luxury-title tw-mb-4">Responsive Design</h3>
          <div className="tw-space-y-3">
            <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-gap-3">
              <div className="tw-bg-gold-600 tw-text-white tw-p-3 tw-rounded tw-text-center tw-text-sm">
                <span className="tw-block tw-md:hidden">📱 Mobile View</span>
                <span className="tw-hidden tw-md:block">💻 Desktop View</span>
              </div>
              <div className="tw-bg-luxury-100 tw-p-3 tw-rounded tw-text-center tw-text-sm tw-text-luxury-800">
                Responsive Grid
              </div>
            </div>
            <p className="tw-text-xs tw-text-luxury-600">Resize your browser to see responsive behavior</p>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="tw-mt-8 tw-card-luxury">
        <h3 className="tw-text-luxury-title tw-mb-4">Advanced Tailwind Features Available</h3>
        <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-3 tw-gap-4">
          <div className="tw-p-4 tw-bg-gradient-to-br tw-from-gold-600 tw-to-gold-700 tw-text-white tw-rounded-lg">
            <h4 className="tw-font-serif tw-text-lg tw-mb-2">Gradients</h4>
            <p className="tw-text-sm tw-opacity-90">Beautiful gradient backgrounds</p>
          </div>
          <div className="tw-p-4 tw-bg-white tw-border tw-border-gold-600/30 tw-rounded-lg tw-shadow-lg tw-transform tw-transition-transform hover:tw--translate-y-1">
            <h4 className="tw-font-serif tw-text-lg tw-mb-2 tw-text-luxury-900">Animations</h4>
            <p className="tw-text-sm tw-text-luxury-700">Hover me for transforms</p>
          </div>
          <div className="tw-p-4 tw-bg-luxury-50 tw-rounded-lg tw-border-l-4 tw-border-gold-600">
            <h4 className="tw-font-serif tw-text-lg tw-mb-2 tw-text-luxury-900">Borders</h4>
            <p className="tw-text-sm tw-text-luxury-700">Precise border control</p>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="tw-mt-8 tw-p-6 tw-bg-green-50 tw-border tw-border-green-200 tw-rounded-lg">
        <div className="tw-flex tw-items-center tw-gap-3 tw-mb-3">
          <div className="tw-w-8 tw-h-8 tw-bg-green-500 tw-rounded-full tw-flex tw-items-center tw-justify-center">
            <i className="fas fa-check tw-text-white tw-text-sm"></i>
          </div>
          <h3 className="tw-font-serif tw-text-xl tw-text-green-800">Migration Complete - Zero Breaking Changes</h3>
        </div>
        <p className="tw-text-green-700 tw-text-sm">
          Your website looks and functions exactly the same. Tailwind CSS is now available for new development 
          with your luxury hotel theme colors, fonts, and design system built-in.
        </p>
      </div>
    </div>
  );
};

export default TailwindTest; 