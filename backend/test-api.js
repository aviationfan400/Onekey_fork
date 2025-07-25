const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001/api/v1';

async function testAPI() {
  console.log(' Testing Onekey Backend API...\n');

  // Test 1: Health Check
  try {
    const health = await fetch('http://localhost:3001/health');
    const healthData = await health.json();
    console.log(' Health Check:', healthData);
  } catch (error) {
    console.log(' Health Check Failed:', error.message);
    return;
  }

  // Test 2: Admin Login
  let token = '';
  try {
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      token = loginData.token;
      console.log(' Admin Login:', { user: loginData.user.username, token: token.substring(0, 20) + '...' });
    } else {
      console.log(' Admin Login Failed:', await loginResponse.text());
      return;
    }
  } catch (error) {
    console.log(' Admin Login Error:', error.message);
    return;
  }

  // Test 3: Get Current User
  try {
    const meResponse = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData = await meResponse.json();
    console.log(' Get Current User:', meData);
  } catch (error) {
    console.log(' Get Current User Error:', error.message);
  }

  // Test 4: Create Event
  let eventId = '';
  try {
    const createEventResponse = await fetch(`${BASE_URL}/timeline/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Performance',
        date: '2024-12-25',
        category: 'performances',
        location: 'Test Venue',
        time: '19:00',
        attendees: '50',
        performers: 'Onekey Ensemble',
        duration: '2 hours',
        description: 'Test event for API testing'
      })
    });
    
    if (createEventResponse.ok) {
      const createData = await createEventResponse.json();
      eventId = createData.id;
      console.log(' Create Event:', createData);
    } else {
      console.log(' Create Event Failed:', await createEventResponse.text());
    }
  } catch (error) {
    console.log(' Create Event Error:', error.message);
  }

  // Test 5: Get All Events
  try {
    const eventsResponse = await fetch(`${BASE_URL}/timeline/events`);
    const eventsData = await eventsResponse.json();
    console.log(' Get All Events:', { count: eventsData.events.length });
  } catch (error) {
    console.log(' Get All Events Error:', error.message);
  }

  // Test 6: Get Events by Category
  try {
    const categoryResponse = await fetch(`${BASE_URL}/timeline/events/category/performances`);
    const categoryData = await categoryResponse.json();
    console.log(' Get Events by Category:', { count: categoryData.events.length });
  } catch (error) {
    console.log(' Get Events by Category Error:', error.message);
  }

  // Test 7: Update Event (if we have an event ID)
  if (eventId) {
    try {
      const updateResponse = await fetch(`${BASE_URL}/timeline/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Updated Test Performance',
          date: '2024-12-25',
          category: 'performances',
          location: 'Updated Test Venue',
          time: '20:00',
          attendees: '75',
          performers: 'Onekey Ensemble',
          duration: '2.5 hours',
          description: 'Updated test event for API testing'
        })
      });
      
      if (updateResponse.ok) {
        const updateData = await updateResponse.json();
        console.log(' Update Event:', updateData);
      } else {
        console.log(' Update Event Failed:', await updateResponse.text());
      }
    } catch (error) {
      console.log(' Update Event Error:', error.message);
    }
  }

  // Test 8: Delete Event (if we have an event ID)
  if (eventId) {
    try {
      const deleteResponse = await fetch(`${BASE_URL}/timeline/events/${eventId}`, {
        method: 'DELETE'
      });
      
      if (deleteResponse.ok) {
        const deleteData = await deleteResponse.json();
        console.log(' Delete Event:', deleteData);
      } else {
        console.log(' Delete Event Failed:', await deleteResponse.text());
      }
    } catch (error) {
      console.log(' Delete Event Error:', error.message);
    }
  }

  console.log('\n API Testing Complete!');
}

testAPI().catch(console.error); 