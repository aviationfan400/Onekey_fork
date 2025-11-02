import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth';
import timelineRoutes from './routes/timeline';
import uploadRoutes from './routes/upload';
import userRoutes from './routes/users';

// Load .env file from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env['PORT'] || 3001;
const isProduction = process.env['NODE_ENV'] === 'production';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(compression());
app.use(morgan('combined'));

// CORS configuration
const corsOptions = {
  origin: isProduction 
    ? process.env['CORS_ORIGIN']?.split(',') || ['https://yourdomain.com']
    : ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/timeline', timelineRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/users', userRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development'
  });
});

// API info endpoint
app.get('/api', (_req, res) => {
  res.json({
    message: 'Onekey Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development',
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      timeline: '/api/v1/timeline',
      upload: '/api/v1/upload'
    }
  });
});

// Serve frontend in production
if (isProduction) {
  // Serve static files from the React build
  app.use(express.static(path.join(__dirname, '../../build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    // Don't serve React app for API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
} else {
  // Development root route
  app.get('/', (_req, res) => {
    res.json({
      message: 'Onekey Backend API (Development)',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      environment: 'development',
      frontend: 'http://localhost:3000',
      endpoints: {
        health: '/health',
        auth: '/api/v1/auth',
        users: '/api/v1/users',
        timeline: '/api/v1/timeline',
        upload: '/api/v1/upload'
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
  if (isProduction) {
    console.log(`📱 Frontend served from: ${path.join(__dirname, '../../build')}`);
  } else {
    console.log(`🔗 Frontend available at: http://localhost:3000`);
  }
}); 