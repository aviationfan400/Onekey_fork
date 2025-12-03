import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages to improve initial load performance
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Timeline = React.lazy(() => import('./pages/Timeline'));
const MeetOurTeam = React.lazy(() => import('./pages/MeetOurTeam'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Simple Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-50">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-12 h-12 bg-surface-200 rounded-full mb-4"></div>
      <div className="h-4 w-32 bg-surface-200 rounded"></div>
    </div>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* All other pages with layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/team" element={<MeetOurTeam />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </>
  );
}

export default App; 