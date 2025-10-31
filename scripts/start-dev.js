#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting OneKey in development mode...\n');

// Check if dependencies are installed
if (!fs.existsSync(path.join(__dirname, '../node_modules'))) {
  console.log('📦 [INFO] Installing frontend dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
}

if (!fs.existsSync(path.join(__dirname, '../backend/node_modules'))) {
  console.log('📦 [INFO] Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '../backend') });
}

// Set up database if it doesn't exist
const dbPath = path.join(__dirname, '../backend/data/onekey.db');
if (!fs.existsSync(dbPath)) {
  console.log('🗄️  [INFO] Setting up database...');
  execSync('npm run migrate', { stdio: 'inherit', cwd: path.join(__dirname, '../backend') });
  execSync('npm run seed', { stdio: 'inherit', cwd: path.join(__dirname, '../backend') });
}

let backend, frontend;

// Cleanup function
const cleanup = () => {
  console.log('\n🛑 [INFO] Stopping servers...');
  try {
    if (backend) backend.kill();
    if (frontend) frontend.kill();
  } catch (e) {
    // Ignore errors
  }
  console.log('✅ [SUCCESS] Servers stopped!');
  process.exit(0);
};

// Set up signal handlers early
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

console.log('🔧 [INFO] Starting backend server...');
backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, '../backend'),
  stdio: 'inherit',
  shell: true
});

// Wait a moment for backend to start
setTimeout(() => {
  console.log('⚛️  [INFO] Starting frontend development server...');
  frontend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    shell: true
  });

  console.log('\n✅ [SUCCESS] Development servers started!');
  console.log('');
  console.log('📱 Frontend: http://localhost:3000');
  console.log('🔌 Backend:  http://localhost:3001');
  console.log('');
  console.log('⏹️  Press Ctrl+C to stop both servers\n');
}, 3000);

