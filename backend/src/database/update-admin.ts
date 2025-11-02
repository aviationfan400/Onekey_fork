import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import db from './db';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function updateAdminPassword() {
  const username = process.env['DEFAULT_ADMIN_USERNAME'] || 'admin';
  const email = process.env['DEFAULT_ADMIN_EMAIL'] || 'on3keymusic@gmail.com';
  const newPassword = process.env['DEFAULT_ADMIN_PASSWORD'] || 'admin123';

  console.log(`Updating admin credentials...`);
  console.log(`Username: ${username} (used for login)`);
  console.log(`Password: [hidden] (used for login)`);
  console.log(`Email: ${email} (stored, not used for login)`);

  try {
    // First, check if user exists by username (since that's what's used for login)
    db.get(
      'SELECT id, username, email, role FROM users WHERE username = ?',
      [username],
      async (err: any, user: any) => {
        if (err) {
          console.error('Database error:', err);
          process.exit(1);
        }

        if (!user) {
          console.log('Admin user not found. Creating new admin user...');
          // Create new admin user
          const adminId = uuidv4();
          const hashedPassword = await bcrypt.hash(newPassword, 12);

          // Ensure role column exists
          db.run('ALTER TABLE users ADD COLUMN role TEXT DEFAULT "user"', () => {
            // Ignore error if column already exists
          });

          db.run(
            'INSERT INTO users (id, username, email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [adminId, username, email, hashedPassword, 'System', 'Administrator', 'super_admin'],
            function(insertErr: any) {
              if (insertErr) {
                console.error('Error creating admin user:', insertErr);
                process.exit(1);
              }
              console.log('✅ Admin user created successfully with new credentials!');
              process.exit(0);
            }
          );
        } else {
          // Update existing user
          const hashedPassword = await bcrypt.hash(newPassword, 12);
          
          // Update password and other fields
          db.run(
            'UPDATE users SET password_hash = ?, email = ?, username = ?, role = ? WHERE id = ?',
            [hashedPassword, email, username, 'super_admin', user.id],
            function(updateErr: any) {
              if (updateErr) {
                console.error('Error updating admin user:', updateErr);
                process.exit(1);
              }
              if (this.changes === 0) {
                console.log('⚠️  No changes made to admin user.');
              } else {
                console.log('✅ Admin credentials updated successfully!');
                console.log(`Updated user ID: ${user.id}`);
                console.log(`\nYou can now login with:`);
                console.log(`  Username: ${username}`);
                console.log(`  Password: [the password you set in .env]`);
              }
              process.exit(0);
            }
          );
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateAdminPassword();
