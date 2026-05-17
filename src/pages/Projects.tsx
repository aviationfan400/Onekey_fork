import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, GraduationCap, Heart, Calendar, Users, Clock, Book, Award, TrendingUp } from 'lucide-react';
import { getRandomPhotos } from '../data/photos';

const Projects: React.FC = () => {
  const projectImages = useMemo(() => getRandomPhotos(3), []);
  
  return (
    <div className="relative bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900">
      {/* Layered Atmospheric Background */}
      <div className="fixed inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, rgba(245, 158, 11, 0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(251, 146, 60, 0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(245, 158, 11, 0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(251, 146, 60, 0.05) 75%)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden lg:pt-40 lg:pb-20">
        <div className="container relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl"
          >
            Our <span className="font-light text-amber-300">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-200"
          >
            Transforming communities through music, education, and service initiatives that create lasting impact
          </motion.p>
        </div>
      </section>

      {/* Main Programs */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">Our Programs</h2>
            <p className="text-surface-400">Three pillars of community service</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                icon: Music,
                title: 'Senior Home Concerts',
                subtitle: 'Music Program',
                image: projectImages[0],
                desc: 'Weekly musical performances bringing joy and connection to 200+ seniors across 5 partner facilities. Our student volunteers perform classical, contemporary, and nostalgic pieces that create meaningful intergenerational bonds.',
                stats: [
                  { label: 'Performances', value: '150+' },
                  { label: 'Facilities', value: '5' },
                  { label: 'Seniors', value: '200+' }
                ]
              },
              {
                icon: GraduationCap,
                title: 'Academic Support',
                subtitle: 'Education Initiative',
                image: projectImages[1],
                desc: 'Comprehensive tutoring and homework assistance for students from elementary through high school. Our volunteer tutors provide personalized support across all subjects, fostering academic confidence and success.',
                stats: [
                  { label: 'Students', value: '85+' },
                  { label: 'Schools', value: '3' },
                  { label: 'Levels', value: 'All' }
                ]
              },
              {
                icon: Heart,
                title: 'Community Fundraising',
                subtitle: 'Service Initiative',
                image: projectImages[2],
                desc: 'Organizing fundraising events and donation drives to support local families and organizations in need. Our efforts have raised over $15,000 for community causes, providing essential support where it\'s needed most.',
                stats: [
                  { label: 'Raised', value: '$15k+' },
                  { label: 'Families', value: '50+' },
                  { label: 'Events', value: '12' }
                ]
              }
            ].map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden transition-all duration-300 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl group hover:bg-white/10"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900 to-transparent"></div>
                    <div className="absolute flex items-center justify-center w-12 h-12 rounded-full top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1 text-lg font-bold text-white">{program.title}</h3>
                    <p className="mb-3 text-xs font-medium text-amber-400">{program.subtitle}</p>
                    <p className="mb-4 text-xs leading-relaxed text-gray-200">{program.desc}</p>
                    <div className="flex gap-4 pt-4 border-t border-white/10">
                      {program.stats.map((stat, i) => (
                        <div key={i} className="flex-1 text-center">
                          <div className="text-sm font-bold text-amber-400">{stat.value}</div>
                          <div className="text-xs text-surface-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">Collective Impact</h2>
            <p className="text-surface-400">Measuring our community reach</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { number: '2,500+', label: 'Volunteer Hours' },
              { number: '285+', label: 'Lives Impacted' },
              { number: '85+', label: 'Volunteers' },
              { number: '8', label: 'Partners' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-5 text-center transition-all duration-300 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl hover:bg-white/10"
              >
                <div className="mb-2 text-3xl font-bold text-amber-400">{stat.number}</div>
                <div className="text-xs font-bold text-white">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="max-w-3xl p-8 mx-auto text-center border backdrop-blur-md bg-white/5 rounded-2xl border-white/10">
            <h2 className="mb-4 text-2xl font-bold text-white">Join Our Mission</h2>
            <p className="mb-6 text-base text-gray-200">
              Whether you're a musician, tutor, or simply passionate about community service, there's a place for you in OneKey. Help us expand our impact and create more meaningful connections in our community.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/get-involved" className="inline-block px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-lg hover:shadow-amber-500/25">
                Become a Volunteer
              </Link>
              <Link to="/contact" className="inline-block px-6 py-3 text-sm font-semibold text-white transition-all duration-300 border rounded-full backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
