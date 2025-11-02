import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const username = process.env['DEFAULT_ADMIN_USERNAME'] || 'admin';
const password = process.env['DEFAULT_ADMIN_PASSWORD'] || 'admin123';
const port = process.env['PORT'] || 3001;

async function testLogin() {
  console.log('Testing login via API...\n');
  console.log(`Server URL: http://localhost:${port}`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}\n`);

  try {
    const response = await fetch(`http://localhost:${port}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json() as any;

    if (response.ok) {
      console.log('✅ Login successful!');
      console.log(`Token: ${data.token.substring(0, 20)}...`);
      console.log(`User: ${JSON.stringify(data.user, null, 2)}`);
    } else {
      console.log('❌ Login failed!');
      console.log(`Status: ${response.status}`);
      console.log(`Error: ${data.error || JSON.stringify(data)}`);
      
      if (data.error === 'Invalid credentials') {
        console.log('\nPossible issues:');
        console.log('1. Username or password is incorrect');
        console.log('2. User account is not active (is_active = 0)');
        console.log('3. Password hash mismatch');
        console.log('\nRun: npm run check-admin to verify database credentials');
      }
    }
  } catch (error: any) {
    console.error('❌ Connection error!');
    console.error(`Error: ${error.message}`);
    console.log('\nMake sure the backend server is running:');
    console.log('  npm run dev (for development)');
    console.log('  npm start (for production)');
  }

  process.exit(0);
}

testLogin();
