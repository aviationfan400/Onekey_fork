# OneKey React Website

A modern React-based website for OneKey student volunteers, featuring advanced admin functionality, multi-user management, and timeline event management.

## Features

### 🎯 Core Features
- **Responsive Design**: Modern, mobile-first design with smooth animations
- **Multi-page Navigation**: Home, About, Projects, Timeline, Get Involved, Contact, Mission
- **Background Animations**: Dynamic floating shapes and gradient effects
- **Sticky Navigation**: Fixed header with scroll effects
- **User Registration**: Public account creation with role-based permissions

### 🔐 Advanced Authentication System
- **3-Tier Role Hierarchy**: Super Admin, Admin, and User levels
- **Public Registration**: Anyone can create a user account
- **Individual Passwords**: Each user has unique login credentials
- **Permission-Based UI**: Features show/hide based on user role
- **Activity Logging**: Complete audit trail of all user actions

### 📅 Advanced Timeline Management
- **Event Categories**: Performances, Homework Help, Charity Events
- **CRUD Operations**: Create, read, update, delete events
- **Rich Event Data**: Date, time, location, attendees, performers, descriptions
- **Visual Timeline**: Beautiful timeline layout with date formatting
- **Admin Controls**: Add/remove events (admin+ only)
- **Confirmation Dialogs**: Safe deletion with confirmation modals

### 🚀 Technical Features
- **TypeScript**: Full type safety
- **Zustand State Management**: Efficient global state
- **React Router**: Client-side routing
- **Persistent Storage**: Data persisted in localStorage
- **Form Validation**: Comprehensive form handling
- **Date Formatting**: Using date-fns library
- **Modern CSS**: Flexbox, Grid, and CSS animations

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Copy Your Images
Copy your existing images from the current website:
```bash
# Copy the pics folder to public/pics
cp -r pics/ public/pics/

# Copy other assets if needed
cp -r others/ public/others/
```

### 3. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

This creates an optimized build in the `build/` folder ready for deployment.

## User Roles & Permissions

### 🔵 User (Default)
**Anyone can register for this role**
- View public content
- View timeline events  
- Edit own profile
- Basic access to website features

### 🟡 Admin
**Promoted by Super Admins**
- All User permissions
- Manage timeline events (add/edit/delete)
- View user list
- Moderate content
- Department-level administration

### 🔴 Super Admin
**System administrator**
- All Admin permissions
- Manage all users (add/remove/promote)
- Change user roles
- View activity logs
- System-wide settings
- Full administrative control

## Getting Started

### 1. Create Your Account
1. Visit the website
2. Click "Sign Up" in the top navigation
3. Fill out the registration form
4. Start with User-level permissions

### 2. Default Super Admin
The system starts with one Super Admin account:
- **Username**: `admin`
- **Password**: `admin`
- **Note**: Change this password immediately in production!

### 3. Role Upgrades
- New users start as "User" role
- Contact a Super Admin to upgrade to "Admin" 
- Super Admins can promote users through the User Management dashboard

## User Management (Super Admin Only)

### Access User Management
1. Login as Super Admin
2. Click your user menu → "Manage Users"

### Features Available
- **Users Tab**: View all users, change roles, manage accounts
- **Add User Tab**: Create accounts for others (admin use)
- **Permissions Tab**: See what each role can do

### Activity Logs
- Click user menu → "Activity Logs"
- View all system activities with timestamps
- Filter by action type (logins, user changes, etc.)
- Complete audit trail for compliance

## File Structure

```
src/
├── components/           # Reusable React components
│   ├── Auth/            # Authentication components
│   │   ├── AuthModal.tsx        # Login modal
│   │   ├── RegisterModal.tsx    # Registration modal
│   │   ├── UserMenu.tsx         # User dropdown menu
│   │   ├── UserManagement.tsx   # Admin user management
│   │   └── ActivityLogs.tsx     # Activity logging
│   └── Layout/          # Layout components
│       ├── BackgroundAnimation.tsx
│       ├── Footer.tsx
│       ├── Layout.tsx
│       └── Navigation.tsx
├── pages/               # Page components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── GetInvolved.tsx
│   ├── Home.tsx
│   ├── Mission.tsx
│   ├── Projects.tsx
│   └── Timeline.tsx
├── store/               # Zustand stores
│   ├── authStore.ts     # Authentication & user management
│   └── timelineStore.ts # Timeline events management
├── styles/              # Global styles
│   └── index.css
├── App.tsx              # Main app component
└── index.tsx            # React entry point
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload `build/` folder to Netlify
3. Configure redirects for React Router

### Traditional Hosting
1. Build the project: `npm run build`
2. Upload `build/` folder contents to web server
3. Configure web server for SPA routing

## Security Considerations

### Production Setup
1. **Change Default Admin Password**: Update the default admin credentials
2. **Environment Variables**: Move sensitive data to environment variables
3. **HTTPS**: Ensure SSL/TLS is enabled
4. **Password Hashing**: Implement proper password hashing (currently plain text for demo)
5. **Rate Limiting**: Add login attempt limits
6. **Session Management**: Implement secure session handling

### Current Security Features
- Permission-based UI components
- Activity logging for audit trails
- User role separation
- Account self-protection (users can't delete themselves)
- Form validation and error handling

## Future Enhancements

### Phase 1: Backend Integration
- [ ] Node.js/Express API
- [ ] PostgreSQL database
- [ ] JWT authentication
- [ ] Password hashing with bcrypt

### Phase 2: Advanced Features
- [ ] Email verification for registration
- [ ] Password reset via email
- [ ] Two-factor authentication
- [ ] Advanced permissions system
- [ ] Department management

### Phase 3: Email Automation
- [ ] Business email integration
- [ ] Automatic event creation from emails
- [ ] Calendar synchronization
- [ ] Email notifications

### Phase 4: Mobile & PWA
- [ ] Progressive Web App features
- [ ] Offline functionality
- [ ] Push notifications
- [ ] Mobile app (React Native)

## Support

For questions about the React version:
- Review the component documentation
- Check the Zustand store implementations
- Test admin functionality with provided credentials

For general OneKey inquiries:
- Email: on3keymusic@gmail.com

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with React, TypeScript, and ❤️ for the OneKey community**