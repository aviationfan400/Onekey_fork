// OneKey Debug Utilities for Chrome DevTools Console
// Load this script to get helpful debugging functions

window.OneKeyDebug = {
  
  // Test API connection
  async testAPI() {
    console.log('🔍 Testing API connection...');
    try {
      const response = await fetch('/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || 'no-token'}`
        }
      });
      const data = await response.json();
      console.log('✅ API Response:', data);
      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      return null;
    }
  },

  // Test login function
  async testLogin(username = 'admin', password = 'admin123') {
    console.log(`🔐 Testing login with ${username}...`);
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        console.log('✅ Login successful!', data.user);
        console.log('🔑 Token saved to localStorage');
      } else {
        console.error('❌ Login failed:', data);
      }
      return data;
    } catch (error) {
      console.error('❌ Login error:', error);
      return null;
    }
  },

  // Check auth state
  checkAuth() {
    console.log('🔍 Checking authentication state...');
    const token = localStorage.getItem('auth_token');
    const authStore = JSON.parse(localStorage.getItem('onekey-auth') || '{}');
    
    console.log('🔑 Token in localStorage:', token ? '✅ Present' : '❌ Missing');
    console.log('👤 Auth store:', authStore);
    console.log('🔐 Is authenticated:', authStore.state?.isAuthenticated || false);
    console.log('👤 Current user:', authStore.state?.user || null);
    
    return {
      hasToken: !!token,
      authStore: authStore.state,
      token: token
    };
  },

  // Test timeline API
  async testTimeline() {
    console.log('📅 Testing timeline API...');
    try {
      const response = await fetch('/api/v1/timeline/events', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || 'no-token'}`
        }
      });
      const data = await response.json();
      console.log('✅ Timeline response:', data);
      return data;
    } catch (error) {
      console.error('❌ Timeline error:', error);
      return null;
    }
  },

  // Create test event
  async createTestEvent() {
    console.log('📝 Creating test event...');
    const testEvent = {
      name: 'Test Event ' + new Date().toLocaleTimeString(),
      date: new Date().toISOString().split('T')[0],
      category: 'performances',
      location: 'Test Location',
      time: '19:00',
      description: 'This is a test event created from console',
      attendees: '50',
      performers: '5'
    };

    try {
      const response = await fetch('/api/v1/timeline/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || 'no-token'}`
        },
        body: JSON.stringify(testEvent)
      });
      const data = await response.json();
      console.log('✅ Test event created:', data);
      return data;
    } catch (error) {
      console.error('❌ Create event error:', error);
      return null;
    }
  },

  // Clear all data
  clearAllData() {
    console.log('🗑️ Clearing all localStorage data...');
    localStorage.clear();
    console.log('✅ All data cleared! Refresh page to reset.');
  },

  // Health check
  async healthCheck() {
    console.log('🏥 Checking server health...');
    try {
      const response = await fetch('/health');
      const data = await response.json();
      console.log('✅ Server health:', data);
      return data;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return null;
    }
  },

  // Full integration test
  async runFullTest() {
    console.log('🚀 Running full integration test...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // 1. Health check
    await this.healthCheck();
    
    // 2. Test login
    await this.testLogin();
    
    // 3. Check auth state
    this.checkAuth();
    
    // 4. Test API access
    await this.testAPI();
    
    // 5. Test timeline
    await this.testTimeline();
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Full test complete!');
  },

  // Show help
  help() {
    console.log(`
🔧 OneKey Debug Functions:

Basic Tests:
• OneKeyDebug.healthCheck()     - Check server status
• OneKeyDebug.testLogin()       - Test admin login
• OneKeyDebug.checkAuth()       - Check current auth state
• OneKeyDebug.testAPI()         - Test API connection

Timeline:
• OneKeyDebug.testTimeline()    - Get timeline events
• OneKeyDebug.createTestEvent() - Create a test event

Utilities:
• OneKeyDebug.clearAllData()    - Clear localStorage
• OneKeyDebug.runFullTest()     - Run all tests
• OneKeyDebug.help()            - Show this help

Example usage:
  OneKeyDebug.testLogin()
  OneKeyDebug.createTestEvent()
    `);
  }
};

// Auto-load message
console.log('🔧 OneKey Debug Tools loaded!');
console.log('Type "OneKeyDebug.help()" for available functions');

// Quick aliases for convenience
window.login = OneKeyDebug.testLogin;
window.checkAuth = OneKeyDebug.checkAuth;
window.testAPI = OneKeyDebug.testAPI;
window.health = OneKeyDebug.healthCheck; 