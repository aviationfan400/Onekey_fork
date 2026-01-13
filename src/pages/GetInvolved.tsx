import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, GraduationCap, Calendar, Camera, Handshake, BarChart3, Users, Clock } from 'lucide-react';

const GetInvolved: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900">
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23f59e0b' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`
      }}></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="container relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Get <span className="font-light text-amber-300">Involved</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Join our community of passionate volunteers and make a meaningful impact through music, education, and service
          </motion.p>
        </div>
      </section>

      {/* Volunteer Opportunities Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">Volunteer Opportunities</h2>
            <p className="text-surface-400">Find the perfect way to contribute to our mission</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Music,
                title: 'Musicians & Performers',
                subtitle: 'Share your musical talents',
                desc: 'Join our weekly concert series at senior living facilities. Perfect for students of all skill levels who want to bring joy through music while gaining valuable performance experience.',
                details: ['Weekly commitment', '2-3 hours per week', 'All skill levels'],
                requirements: ['Basic musical ability', 'Reliable transportation', 'Enthusiasm for service']
              },
              {
                icon: GraduationCap,
                title: 'Academic Tutors',
                subtitle: 'Help students succeed',
                desc: 'Provide one-on-one and small group tutoring for students from elementary through high school. Make a direct impact on educational outcomes in your community.',
                details: ['Flexible schedule', '2-4 hours per week', 'Various subjects'],
                requirements: ['Strong academic skills', 'Patience and communication', 'Background check (provided)']
              },
              {
                icon: Calendar,
                title: 'Event Coordinators',
                subtitle: 'Organize community events',
                desc: 'Help plan and execute fundraising events, community outreach programs, and special concerts. Perfect for students interested in event management and leadership.',
                details: [],
                requirements: ['Organizational abilities', 'Communication skills', 'Creative thinking']
              },
              {
                icon: Camera,
                title: 'Media & Documentation',
                subtitle: 'Capture our impact',
                desc: 'Document our programs through photography, videography, and social media content. Help us share our story and attract new volunteers and supporters.',
                details: [],
                requirements: ['Photography/video skills', 'Social media knowledge', 'Creative storytelling']
              },
              {
                icon: Handshake,
                title: 'Community Outreach',
                subtitle: 'Expand our reach',
                desc: 'Connect with local organizations, schools, and community groups to build partnerships and identify new opportunities for service.',
                details: [],
                requirements: ['Strong communication', 'Networking abilities', 'Relationship building']
              },
              {
                icon: BarChart3,
                title: 'Administrative Support',
                subtitle: 'Keep us organized',
                desc: 'Assist with scheduling, volunteer coordination, data management, and general administrative tasks that keep OneKey running smoothly.',
                details: [],
                requirements: ['Attention to detail', 'Computer proficiency', 'Organizational skills']
              }
            ].map((opportunity, index) => {
              const Icon = opportunity.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{opportunity.title}</h3>
                  <p className="text-amber-400 text-xs font-medium mb-3">{opportunity.subtitle}</p>
                  <p className="text-gray-200 text-xs leading-relaxed mb-4">{opportunity.desc}</p>
                  
                  {opportunity.details.length > 0 && (
                    <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                      {opportunity.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-200 text-xs">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {opportunity.requirements.map((req, i) => (
                        <li key={i} className="text-gray-200 text-xs flex items-start gap-2">
                          <span className="text-amber-400 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Join Process */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">How to Join</h2>
            <p className="text-surface-400">Four simple steps to start making a difference</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Submit Application', desc: 'Complete our online application form with your interests, availability, and relevant experience. The process takes just 5-10 minutes.' },
              { step: '02', title: 'Interview & Matching', desc: 'Meet with our volunteer coordinator to discuss your goals and find the perfect volunteer opportunity that matches your skills and interests.' },
              { step: '03', title: 'Orientation & Training', desc: 'Attend our comprehensive orientation session and receive role-specific training to ensure you feel confident and prepared.' },
              { step: '04', title: 'Start Making Impact', desc: 'Begin your volunteer journey with ongoing support from our team. Track your hours and see the direct impact of your contributions.' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <div className="text-4xl font-bold text-amber-400/40 mb-3">{item.step}</div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden">
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-base text-gray-200 mb-6">
              Take the first step towards meaningful community service. Join OneKey today and discover how your skills and passion can create lasting positive impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:on3keymusic@gmail.com" className="inline-block px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-lg hover:shadow-amber-500/25">
                Apply Now
              </a>
              <Link to="/about" className="inline-block px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
