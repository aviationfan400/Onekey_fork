import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

interface PhotoGalleryProps {
  images: string[];
  title?: string;
  className?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  images, 
  title = "Our Gallery",
  className = "" 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  if (!images.length) return null;

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, images.length));
  };

  return (
    <div className={`py-24 ${className}`}>
      {title && (
        <h3 className="text-4xl font-bold text-white mb-12 text-center">
          {title}
        </h3>
      )}

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
        {visibleImages.map((src, index) => (
          <motion.div
            key={`${src}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 6) * 0.05 }}
            className="break-inside-avoid"
          >
            <motion.div 
              className="relative group overflow-hidden rounded-sm cursor-pointer shadow-md"
              onClick={() => setSelectedImage(src)}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              />
              <motion.img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            className="btn-secondary inline-flex items-center px-8 py-3 text-surface-900 border-surface-300 hover:bg-surface-50"
          >
            Load More <ChevronDown className="ml-2 w-4 h-4" />
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-surface-900 hover:text-primary-600 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={selectedImage}
              alt="Full screen"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
