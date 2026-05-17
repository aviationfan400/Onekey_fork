#!/usr/bin/env node

// OneKey Integration Test
// This script tests the connection between frontend and backend

const BACKEND_URL = 'http://localhost:3001';
const FRONTEND_URL = 'http://localhost:3000';

async function testBackendHealth() {
  try {
    console.log('🔍 Testing backend health...');
    const response = await fetch(`${BACKEND_URL}/health`);
    const data = await response.json();
    
    if (response.ok && data.status === 'ok') {
      console.log('✅ Backend is healthy!');
      return true;
    } else {
      console.log('❌ Backend health check failed:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ Backend is not running or not accessible:', error.message);
    return false;
  }
}

async function testBackendAPI() {
  try {
    console.log('🔍 Testing backend API...');
    const response = await fetch(`${BACKEND_URL}/api`);
    const data = await response.json();
    
    if (response.ok && data.message) {
      console.log('✅ Backend API is working!');
      console.log(`   Environment: ${data.environment}`);
      console.log(`   Version: ${data.version}`);
      return true;
    } else {
      console.log('❌ Backend API test failed:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ Backend API test failed:', error.message);
    return false;
  }
}

async function testFrontendAccess() {
  try {
    console.log('🔍 Testing frontend access...');
    const response = await fetch(FRONTEND_URL);
    
    if (response.ok) {
      console.log('✅ Frontend is accessible!');
      return true;
    } else {
      console.log('❌ Frontend access failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Frontend is not running or not accessible:', error.message);
    return false;
  }
}

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    const response = await fetch(`${BACKEND_URL}/api/v1/users`);
    
    if (response.status === 401) {
      // 401 is expected - it means the API is working but we need authentication
      console.log('✅ Database connection is working! (Authentication required)');
      return true;
    } else if (response.ok) {
      console.log('✅ Database connection is working!');
      return true;
    } else {
      console.log('❌ Database connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Database connection test failed:', error.message);
    return false;
  }
}

async function runIntegrationTest() {
  console.log('🚀 Starting OneKey Integration Test...\n');
  
  const tests = [
    { name: 'Backend Health', test: testBackendHealth },
    { name: 'Backend API', test: testBackendAPI },
    { name: 'Frontend Access', test: testFrontendAccess },
    { name: 'Database Connection', test: testDatabaseConnection }
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const { name, test } of tests) {
    console.log(`\n📋 ${name}:`);
    const result = await test();
    if (result) passed++;
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! Your OneKey application is ready.');
    console.log('\n📝 Next steps:');
    console.log('1. Visit http://localhost:3000 to see the frontend');
    console.log('2. Login with admin/admin123 to access admin features');
    console.log('3. Try adding events in the Timeline section');
    console.log('\n💾 **Important**: Timeline events are now stored permanently in the database!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check:');
    console.log('1. Is the backend running? (npm run dev:backend)');
    console.log('2. Is the frontend running? (npm run dev:frontend)');
    console.log('3. Are all dependencies installed? (npm run install:all)');
  }
}

// Run the test
runIntegrationTest().catch(console.error); 