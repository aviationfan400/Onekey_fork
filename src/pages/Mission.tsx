import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, GraduationCap, Heart, Users, Sprout, HandHeart } from 'lucide-react';

const Mission: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900">
      {/* Geometric Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0-5.523-4.477-10-10-10zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0-5.523-4.477-10-10-10zM30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0-5.523-4.477-10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden lg:pt-40 lg:pb-20">
        <div className="container relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl"
          >
            Our <span className="font-light text-orange-300">Mission</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-200"
          >
            Empowering students to create positive change through music, education, and community service that bridges generations
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Statements */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 transition-all duration-300 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl hover:bg-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-600">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-200">
                OneKey exists to unlock the potential of young people by providing meaningful opportunities to serve their community through music performances, educational support, and charitable initiatives. We believe in the power of youth to create positive change and foster connections across generations.
              </p>
              <div className="px-4 py-3 border rounded-lg bg-amber-500/10 border-amber-500/20">
                <span className="text-sm italic text-amber-300">"Unlocking potential through service"</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 transition-all duration-300 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl hover:bg-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-rose-600">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-surface-300">
                A community where students are empowered to be leaders, where music brings joy and healing, and where service creates lasting bonds between people of all ages. We envision a future where intergenerational connections flourish through shared experiences and mutual support.
              </p>
              <div className="px-4 py-3 border rounded-lg bg-orange-500/10 border-orange-500/20">
                <span className="text-sm italic text-orange-300">"Building bridges across generations"</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">Core Principles</h2>
            <p className="text-surface-400">The values that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Music, title: 'Music as Universal Language', desc: 'We believe music transcends age, background, and circumstance, creating immediate connections and shared joy between performers and audiences.' },
              { icon: GraduationCap, title: 'Education Empowers', desc: "Knowledge shared freely multiplies in value. We're committed to providing educational support that builds confidence and opens opportunities." },
              { icon: HandHeart, title: 'Service Develops Character', desc: 'Through service to others, students develop empathy, leadership skills, and a deeper understanding of their role in the community.' },
              { icon: Users, title: 'Intergenerational Connection', desc: 'Young and old have much to learn from each other. We create opportunities for meaningful relationships that benefit all generations.' },
              { icon: Sprout, title: 'Growth Through Experience', desc: "Real-world experience in service, performance, and leadership provides invaluable learning that can't be found in textbooks." },
              { icon: Heart, title: 'Compassion in Action', desc: 'True change happens when compassion moves beyond feeling to action. We put care into practice through tangible service.' }
            ].map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 transition-all duration-300 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl hover:bg-white/10 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 mb-4 transition-transform rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{principle.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-200">{principle.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Goals Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">Our Goals</h2>
            <p className="text-surface-400">What we strive to achieve in our community</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {[
                { num: '01', title: 'Expand Musical Outreach', desc: 'Increase the number of senior facilities we serve from 5 to 10, bringing weekly concerts to 400+ residents across the region while maintaining the personal, intimate nature of our performances.' },
                { num: '02', title: 'Strengthen Educational Support', desc: 'Double our tutoring capacity to serve 150+ students annually, with specialized programs for STEM subjects, test preparation, and English language learning support.' },
                { num: '03', title: 'Develop Student Leaders', desc: 'Create a comprehensive leadership development program that prepares our volunteers for future community leadership roles and provides college-level experience in project management.' },
                { num: '04', title: 'Build Community Partnerships', desc: 'Establish formal partnerships with 15+ local organizations, creating a network of mutual support that amplifies the impact of all community service efforts.' },
                { num: '05', title: 'Ensure Sustainability', desc: 'Create a sustainable funding model and succession planning that ensures OneKey continues to serve the community for generations to come, with proper training and mentorship programs.' }
              ].map((goal, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-5 transition-all duration-300 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl hover:bg-white/10"
                >
                  <div className="text-3xl font-bold text-amber-400/40 min-w-[3rem]">{goal.num}</div>
                  <div>
                    <h3 className="mb-2 text-base font-bold text-white">{goal.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-200">{goal.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-5 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl"
              >
                <blockquote className="mb-3 text-sm italic text-surface-300">
                  "The best way to find yourself is to lose yourself in the service of others."
                </blockquote>
                <cite className="text-xs text-amber-400">— Mahatma Gandhi</cite>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-5 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl"
              >
                <h4 className="mb-4 text-base font-bold text-white">Target Timeline</h4>
                <div className="space-y-3">
                  {[
                    { year: '2025', goal: 'Expand to 8 facilities' },
                    { year: '2026', goal: 'Launch leadership program' },
                    { year: '2027', goal: 'Reach sustainability goals' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400">{item.year}</span>
                      <span className="text-surface-300">{item.goal}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Impact Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="mb-4 text-2xl font-bold text-white">Living Our Mission</h2>
              <p className="text-sm leading-relaxed text-surface-300">
                Our mission isn't just words on a page—it's the driving force behind every concert, every tutoring session, and every act of service. Since our founding, we've seen firsthand how young people can transform not only their communities but themselves through meaningful service.
              </p>
              
              <p className="text-sm leading-relaxed text-surface-300">
                Every Thursday afternoon, when our student musicians perform for senior residents, we see our mission in action. In the quiet moments when a tutor helps a struggling student understand a difficult concept, our vision becomes reality. Through every fundraising dollar raised for families in need, we demonstrate that students can be powerful agents of positive change.
              </p>
              
              <div className="p-4 mt-6 border backdrop-blur-sm bg-amber-500/10 border-amber-500/20 rounded-xl">
                <p className="mb-2 text-sm italic text-amber-300">
                  "OneKey has taught us that service isn't just about helping others—it's about discovering who we are and who we can become."
                </p>
                <cite className="text-xs text-amber-400">— Curtis Wei & Ethan Xie, Co-Founders</cite>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: '4', label: 'Years of Service' },
                { number: '285+', label: 'Lives Touched' },
                { number: '2,500+', label: 'Service Hours' },
                { number: '∞', label: 'Possibilities' }
              ].map((stat, index) => (
                <div key={index} className="p-5 text-center transition-all duration-300 border backdrop-blur-sm bg-white/5 border-white/10 rounded-2xl hover:bg-white/10">
                  <div className="mb-2 text-3xl font-bold text-amber-400">{stat.number}</div>
                  <div className="text-xs text-surface-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="max-w-3xl p-8 mx-auto text-center border backdrop-blur-md bg-white/5 rounded-2xl border-white/10">
            <h2 className="mb-4 text-2xl font-bold text-white">Be Part of Our Mission</h2>
            <p className="mb-6 text-base text-gray-200">
              Our mission becomes reality through the dedication and passion of volunteers like you. Join OneKey and help us continue building bridges across generations through the power of service.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/get-involved" className="inline-block px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-lg hover:shadow-amber-500/25">
                Join Our Mission
              </Link>
              <Link to="/about" className="inline-block px-6 py-3 text-sm font-semibold text-white transition-all duration-300 border rounded-full backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20">
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission; 