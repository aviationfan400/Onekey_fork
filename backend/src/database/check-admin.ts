import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import db from './db';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function checkAdmin() {
  const username = process.env['DEFAULT_ADMIN_USERNAME'] || 'admin';
  const password = process.env['DEFAULT_ADMIN_PASSWORD'] || 'admin123';

  console.log('Checking admin credentials...\n');
  console.log(`Looking for username: ${username}`);
  console.log(`Expected password: ${password}\n`);

  db.get(
    'SELECT id, username, email, password_hash, role, is_active FROM users WHERE username = ?',
    [username],
    async (err: any, user: any) => {
      if (err) {
        console.error('Database error:', err);
        process.exit(1);
      }

      if (!user) {
        console.log('❌ No user found with that username!');
        console.log('\nAvailable users in database:');
        db.all('SELECT username, email, role FROM users', [], (err: any, users: any) => {
          if (err) {
            console.error('Error fetching users:', err);
          } else {
            users.forEach((u: any) => {
              console.log(`  - Username: ${u.username}, Email: ${u.email}, Role: ${u.role}`);
            });
          }
          process.exit(1);
        });
        return;
      }

      console.log('✅ User found!');
      console.log(`  ID: ${user.id}`);
      console.log(`  Username: ${user.username}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role || 'user'}`);
      console.log(`  Is Active: ${user.is_active === 1 ? 'Yes' : 'No'}`);
      console.log(`\nPassword hash in DB: ${user.password_hash.substring(0, 20)}...`);

      // Test password
      console.log('\nTesting password...');
      const isValid = await bcrypt.compare(password, user.password_hash);
      
      if (isValid) {
        console.log('✅ Password is CORRECT!');
        console.log('\nYou should be able to login with:');
        console.log(`  Username: ${user.username}`);
        console.log(`  Password: ${password}`);
      } else {
        console.log('❌ Password is INCORRECT!');
        console.log(`\nThe password "${password}" does not match the stored hash.`);
        console.log('\nTo fix this, run:');
        console.log('  npm run update-admin');
        console.log('\nMake sure your .env file has the correct password.');
      }

      process.exit(0);
    }
  );
}

checkAdmin();
