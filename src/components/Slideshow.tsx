import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowProps {
  images: string[];
  interval?: number;
  overlay?: boolean;
  className?: string;
}

const Slideshow: React.FC<SlideshowProps> = ({ 
  images, 
  interval = 6000, 
  overlay = true,
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Elegant Overlay - Lighter and smoother */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40 z-10" />
      )}
      
      {/* Preload next image */}
      <div className="hidden">
        <img src={images[(currentIndex + 1) % images.length]} alt="preload" />
      </div>
    </div>
  );
};

export default Slideshow;
