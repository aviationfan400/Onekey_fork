# OneKey Documentation

Complete documentation for the OneKey Student Volunteers application.

## 📚 **Documentation Index**

### **Getting Started**
- **[Main README](../README.md)** - Project overview and quick start
- **[Setup Guide](./setup.md)** - Initial project setup
- **[Development Guide](./DEVELOPMENT.md)** - Development workflow

### **Integration & Deployment**
- **[Integration Guide](./INTEGRATION_GUIDE.md)** - Frontend-backend integration
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment

### **Development Resources**
- **[Tailwind Migration](./TAILWIND_MIGRATION_GUIDE.md)** - Styling framework guide

## 🚀 **Quick Commands**

### **Development**
```bash
# Start development servers
npm run start:dev
# or
npm run dev

# Install all dependencies
npm run setup
```

### **Testing**
```bash
# Run integration tests
npm run test:integration

# Debug in browser console
OneKeyDebug.help()
```

### **Deployment**
```bash
# Deploy to production
npm run deploy:setup

# Start production server
npm run deploy:start
```

## 📁 **Project Structure**

```
OneKey/
├── docs/                   # 📚 All documentation
│   ├── README.md          # This file
│   ├── setup.md           # Setup guide
│   ├── DEVELOPMENT.md     # Development guide
│   ├── INTEGRATION_GUIDE.md # Integration details
│   └── TAILWIND_MIGRATION_GUIDE.md # Styling guide
├── scripts/               # 🔧 Deployment and utility scripts
│   ├── deploy.sh          # Production deployment
│   ├── start-dev.sh       # Development startup
│   └── test-integration.js # Integration tests
├── src/                   # ⚛️ Frontend React code
├── backend/               # 🔗 Backend Node.js code
├── public/                # 📄 Static assets
└── build/                 # 📦 Production build
```

## 🔧 **Development Tools**

### **Browser Console Debug Functions**
Available at `http://localhost:3000` (development only):

```javascript
// Quick tests
login()                    // Test admin login
checkAuth()               // Check auth state
health()                  // Server health

// Full debug suite
OneKeyDebug.help()         // Show all functions
OneKeyDebug.runFullTest()  // Run complete test
```

## 🏗️ **Architecture Overview**

### **Frontend (React + TypeScript)**
- State management with Zustand
- Styling with Tailwind CSS
- API integration with automatic environment detection

### **Backend (Node.js + Express)**
- SQLite database with automatic migrations
- JWT authentication with role-based permissions
- File upload and image processing
- Production-ready with security features

### **Database**
- SQLite for simplicity and portability
- Automatic daily backups
- Migration system for schema updates

## 🛡️ **Security**

- JWT token authentication
- Role-based permissions (super_admin, admin, user)
- CORS protection
- Rate limiting
- Input validation

## 📊 **Data Persistence**

- **Development**: Data stored locally in `backend/data/onekey.db`
- **Production**: Data stored on server with automatic backups
- **Migrations**: Automatic database schema updates
- **Backups**: Daily automated backups with 30-day retention

## 🆘 **Troubleshooting**

### **Common Issues**
1. **Port in use**: `lsof -ti:3001 | xargs kill -9`
2. **Database issues**: `cd backend && npm run migrate && npm run seed`
3. **Permission denied**: `chmod +x scripts/*.sh`

### **Debug Steps**
1. Check server logs in terminal
2. Use browser console debug functions
3. Run integration tests: `npm run test:integration`
4. Check backend health: `curl http://localhost:3001/health`

## 📞 **Support**

For technical support or questions:
- Email: on3keymusic@gmail.com
- Check the documentation files in this directory
- Use the debug tools for troubleshooting 