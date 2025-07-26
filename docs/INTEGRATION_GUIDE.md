# OneKey Frontend-Backend Integration Guide

## 🎯 What We've Accomplished

Your OneKey application now has **complete frontend-backend integration** and is ready for production deployment with your domain. Here's what's been set up:

### ✅ Full Integration Features
- **Authentication System**: Login/register with JWT tokens
- **API Integration**: Frontend automatically connects to backend
- **Database**: SQLite with automatic migrations and seeding
- **File Upload**: Image upload and processing
- **Production Ready**: Single deployment that serves both frontend and backend
- **Domain Support**: Configured for your domain with SSL support

## 🚀 How to Use

### Development (Local Testing)
```bash
# Start both frontend and backend together
./start-dev.sh

# Or use npm
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### Production (With Your Domain)
```bash
# Set up production deployment
./deploy.sh

# Start production server
./start-production.sh
```

## 🔧 How the Integration Works

### Frontend-Backend Communication
1. **Development**: Frontend calls `http://localhost:3001/api/v1/*`
2. **Production**: Frontend calls `/api/v1/*` (same domain)
3. **Automatic Detection**: The API service detects the environment automatically

### Authentication Flow
1. User logs in through frontend
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. All subsequent API calls include the token
5. Backend validates token for protected routes

### Database Integration
- **SQLite Database**: Stored in `backend/data/onekey.db`
- **Automatic Setup**: Run `npm run setup` to create database and seed data
- **Backups**: Automatic daily backups to `backend/data/backups/`

## 🌐 Production Deployment with Your Domain

### Step 1: Prepare Your Server
```bash
# Install Node.js 18+ on your server
# Clone your repository
git clone <your-repo>
cd OneKey
```

### Step 2: Deploy
```bash
# Run the deployment script
./deploy.sh
```

This script will:
- Install all dependencies
- Build frontend and backend
- Set up database
- Create production configuration
- Generate startup scripts

### Step 3: Configure Your Domain
Edit `backend/.env`:
```env
# Replace with your actual domain
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

### Step 4: Start the Application
```bash
# Option 1: Direct start
./start-production.sh

# Option 2: PM2 (recommended)
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### Step 5: Set Up SSL (HTTPS)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 📊 What's Different Now

### Before (Simple Frontend)
- ❌ No real authentication
- ❌ No database
- ❌ No backend API
- ❌ No file uploads
- ❌ No user management

### After (Full Integration)
- ✅ **Real Authentication**: JWT tokens, user roles, secure login
- ✅ **Database**: SQLite with automatic migrations
- ✅ **Backend API**: RESTful API with all CRUD operations
- ✅ **File Upload**: Image upload and processing
- ✅ **User Management**: Admin dashboard for user control
- ✅ **Production Ready**: Single deployment with domain support

## 🔐 Default Admin Account
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change this password in production!

## 🧪 Testing the Integration

### Run Integration Test
```bash
# Start both servers first
npm run dev

# In another terminal, run the test
npm run test:integration
```

### Manual Testing
1. Visit http://localhost:3000
2. Click "Login" in the footer
3. Use admin/admin123
4. Try adding events in the Timeline
5. Check the Admin Dashboard

## 📁 Key Files Created/Modified

### New Files
- `deploy.sh` - Production deployment script
- `start-dev.sh` - Development startup script
- `start-production.sh` - Production startup script
- `ecosystem.config.js` - PM2 configuration
- `nginx.conf.template` - Nginx configuration template
- `test-integration.js` - Integration test script
- `DEPLOYMENT.md` - Detailed deployment instructions

### Modified Files
- `backend/src/server.ts` - Updated to serve frontend in production
- `src/services/api.ts` - Auto-detects environment for API URLs
- `package.json` - Added production scripts
- `README.md` - Complete documentation

## 🔧 Configuration Options

### Environment Variables (backend/.env)
```env
# Server
NODE_ENV=production
PORT=3001

# Database
DB_PATH=./data/onekey.db

# Security
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://yourdomain.com

# Admin
DEFAULT_ADMIN_PASSWORD=your-secure-password
```

### Frontend Configuration
The frontend automatically detects the environment:
- **Development**: API calls go to `http://localhost:3001`
- **Production**: API calls go to the same domain

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   lsof -ti:3001 | xargs kill -9
   ```

2. **Database Issues**
   ```bash
   cd backend && npm run migrate && npm run seed
   ```

3. **Permission Denied**
   ```bash
   chmod +x *.sh
   ```

4. **Frontend Can't Connect to Backend**
   - Check if backend is running: `curl http://localhost:3001/health`
   - Check CORS configuration in backend
   - Verify API base URL in frontend

### Logs
- **Backend**: Check `backend/logs/app.log`
- **PM2**: `pm2 logs onekey`
- **Frontend**: Browser console

## 🎉 You're Ready!

Your OneKey application now has:
- ✅ Complete frontend-backend integration
- ✅ Real authentication system
- ✅ Database with automatic setup
- ✅ File upload capabilities
- ✅ Production deployment ready
- ✅ Domain support with SSL

### Next Steps
1. Test locally: `./start-dev.sh`
2. Deploy to production: `./deploy.sh`
3. Configure your domain
4. Set up SSL certificate
5. Change default admin password
6. Start using your fully integrated application!

---

**Need help?** Check the main README.md or email on3keymusic@gmail.com 