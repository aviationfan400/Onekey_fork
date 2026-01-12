import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env['DB_PATH'] || path.join(__dirname, '../../data/onekey.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Enable WAL mode and performance optimizations
db.serialize(() => {
  // Enable Write-Ahead Logging for better concurrency and performance
  db.run('PRAGMA journal_mode = WAL;');
  
  // Optimize SQLite for better performance
  db.run('PRAGMA synchronous = NORMAL;'); // Faster than FULL, still safe with WAL
  db.run('PRAGMA cache_size = 10000;'); // Increase cache size (10MB)
  db.run('PRAGMA temp_store = MEMORY;'); // Store temp tables in memory
  db.run('PRAGMA mmap_size = 30000000000;'); // Use memory-mapped I/O (30GB)
  db.run('PRAGMA page_size = 4096;'); // Optimal page size
  
  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT DEFAULT 'user',
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_login_at TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS timeline_events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    time TEXT,
    attendees TEXT,
    performers TEXT,
    duration TEXT,
    description TEXT,
    photo_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
  
  // Create indexes for better query performance
  db.run('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);');
  db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');
  db.run('CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);');
  db.run('CREATE INDEX IF NOT EXISTS idx_timeline_date ON timeline_events(date DESC);');
  db.run('CREATE INDEX IF NOT EXISTS idx_timeline_category ON timeline_events(category);');
  db.run('CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_logs(user_id);');
  db.run('CREATE INDEX IF NOT EXISTS idx_activity_timestamp ON activity_logs(timestamp DESC);');
});

export default db; 