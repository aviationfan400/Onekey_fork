
import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slideshow from '../components/Slideshow';
import PhotoGallery from '../components/PhotoGallery';
import { getRandomPhotos } from '../data/photos';

const Home: React.FC = () => {
  const heroImages = useMemo(() => getRandomPhotos(6), []);
  const galleryImages = useMemo(() => getRandomPhotos(12), []);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="overflow-hidden bg-surface-50">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Slideshow Background */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Slideshow images={heroImages} interval={6000} overlay={true} />
        </motion.div>

        <div className="container relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-medium mb-8 leading-tight tracking-tight drop-shadow-lg">
                Harmony in <span className="italic text-primary-300 drop-shadow-md">Service</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-md">
                Bridging generations through the universal language of music. 
                We are student volunteers making a difference.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/about" className="btn-primary bg-white text-surface-900 hover:bg-surface-100 border-none px-10 shadow-lg">
                  Our Mission
                </Link>
                <Link to="/timeline" className="btn-secondary text-white border-white/40 hover:bg-white/10 px-10 backdrop-blur-sm shadow-lg">
                  Upcoming Events
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ArrowRight className="rotate-90" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction / Philosophy */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary-600 font-display italic text-xl mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-surface-900 mb-8 leading-tight">
              More than just music. <br/> It's about connection.
            </h2>
            <p className="text-lg text-surface-600 leading-relaxed">
              OneKey was founded on the belief that music has the power to heal, connect, and inspire. 
              Our student volunteers dedicate their time and talent to bring joy to senior communities, 
              fostering intergenerational bonds that enrich lives on both sides.
            </p>
          </div>
        </div>
      </section>

      {/* Impact / Services */}
      <section className="py-32 bg-surface-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Music",
                subtitle: "Senior Home Concerts",
                image: heroImages[0],
                desc: "Regular performances that bring the concert hall to the community."
              },
              {
                title: "Education",
                subtitle: "Academic Support",
                image: heroImages[1],
                desc: "Empowering younger students through peer tutoring and mentorship."
              },
              {
                title: "Community",
                subtitle: "Fundraising & Volunteering",
                image: heroImages[2],
                desc: "Active participation in local events to support those in need."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-8 relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <h3 className="text-3xl font-display font-medium mb-2">{service.title}</h3>
                <p className="text-primary-600 font-medium mb-4">{service.subtitle}</p>
                <p className="text-surface-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="bg-white border-t border-surface-100">
        <div className="container">
          <PhotoGallery images={galleryImages} title="Our Community in Pictures" />
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center bg-surface-50 rounded-3xl p-12 shadow-sm border border-surface-100">
            <h2 className="text-3xl font-bold text-surface-900 mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-surface-600 mb-10 max-w-2xl mx-auto">
              Join OneKey and become part of a student-driven organization dedicated to creating positive change.
            </p>
            <Link to="/timeline" className="btn-primary inline-flex items-center h-14 px-8 text-lg">
              View Upcoming Events <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
