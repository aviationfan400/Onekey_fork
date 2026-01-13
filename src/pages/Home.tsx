
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
    <div className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900">
      {/* Geometric Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Slideshow Background */}
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-20">
          <Slideshow images={heroImages} interval={6000} overlay={true} />
        </motion.div>

        <div className="container relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl font-display drop-shadow-lg">
                Harmony in <span className="font-light italic text-amber-300 drop-shadow-md">Service</span>
              </h1>
              <p className="max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed tracking-wide md:text-xl text-white/90 drop-shadow-md">
                Bridging generations through the universal language of music. 
                We are student volunteers making a difference.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/about" className="inline-block px-8 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-lg hover:shadow-amber-500/25">
                  Our Mission
                </Link>
                <Link to="/timeline" className="inline-block px-8 py-3 text-sm font-semibold text-white transition-all duration-300 border rounded-full backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20">
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
            className="absolute transform -translate-x-1/2 bottom-10 left-1/2 text-white/50"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <ArrowRight className="rotate-90" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction / Philosophy */}
      <section className="relative py-20 overflow-hidden">
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="block mb-3 text-lg italic text-amber-400 font-display">Our Philosophy</span>
            <h2 className="mb-6 text-3xl font-medium leading-tight text-white md:text-4xl font-display">
              More than just music. <br/> It's about connection.
            </h2>
            <p className="text-base leading-relaxed text-gray-200">
              OneKey was founded on the belief that music has the power to heal, connect, and inspire. 
              Our student volunteers dedicate their time and talent to bring joy to senior communities, 
              fostering intergenerational bonds that enrich lives on both sides.
            </p>
          </div>
        </div>
      </section>

      {/* Impact / Services */}
      <section className="relative py-20 overflow-hidden">
        <div className="container relative">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
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
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 group-hover:opacity-100" />
                </div>
                <h3 className="mb-2 text-2xl font-medium text-white font-display">{service.title}</h3>
                <p className="mb-3 text-sm font-medium text-amber-400">{service.subtitle}</p>
                <p className="text-sm leading-relaxed text-gray-200">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="relative py-16">
        <div className="container">
          <PhotoGallery images={galleryImages} title="Our Community in Pictures" />
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-16">
        <div className="container relative">
          <div className="max-w-4xl p-8 mx-auto text-center border shadow-2xl backdrop-blur-md bg-white/5 rounded-2xl border-white/10">
            <h2 className="mb-4 text-2xl font-bold text-white">Ready to Make a Difference?</h2>
            <p className="max-w-2xl mx-auto mb-6 text-base text-gray-200">
              Join OneKey and become part of a student-driven organization dedicated to creating positive change.
            </p>
            <Link to="/timeline" className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-lg hover:shadow-amber-500/25">
              View Upcoming Events <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
