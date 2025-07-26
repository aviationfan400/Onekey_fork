import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import db from '../database/db';
import { authenticateToken, requireRole, logActivity, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get all users (admin only)
router.get('/', 
  authenticateToken, 
  requireRole(['admin']), 
  logActivity('list_users'),
  (req, res) => {
    db.all('SELECT id, username, email, first_name, last_name, role, is_active, created_at, last_login_at FROM users ORDER BY created_at DESC', (err: any, users: any) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      return res.json({ users });
    });
  }
);

// Get user by ID
router.get('/:id', 
  authenticateToken, 
  requireRole(['admin']), 
  logActivity('get_user'),
  (req, res) => {
    db.get('SELECT id, username, email, first_name, last_name, role, is_active, created_at, last_login_at FROM users WHERE id = ?', [req.params.id], (err: any, user: any) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json({ user });
    });
  }
);

// Create new user (admin only)
router.post('/',
  authenticateToken,
  requireRole(['admin']),
  logActivity('create_user'),
  [
    body('username').isLength({ min: 3 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').optional().trim().escape(),
    body('lastName').optional().trim().escape(),
    body('role').optional().isIn(['user', 'admin', 'moderator'])
  ],
  async (req: AuthenticatedRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, firstName, lastName, role = 'user' } = req.body;
    const userId = uuidv4();

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      db.run(
        'INSERT INTO users (id, username, email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, username, email, hashedPassword, firstName, lastName, role],
        function(err: any) {
          if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
              return res.status(400).json({ error: 'Username or email already exists' });
            }
            return res.status(500).json({ error: 'Database error' });
          }
          return res.status(201).json({ 
            message: 'User created successfully',
            userId 
          });
        }
      );
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update user
router.put('/:id',
  authenticateToken,
  requireRole(['admin']),
  logActivity('update_user'),
  [
    body('firstName').optional().trim().escape(),
    body('lastName').optional().trim().escape(),
    body('role').optional().isIn(['user', 'admin', 'moderator']),
    body('isActive').optional().isBoolean()
  ],
  (req: AuthenticatedRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, role, isActive } = req.body;
    const updates: string[] = [];
    const values: any[] = [];

    if (firstName !== undefined) {
      updates.push('first_name = ?');
      values.push(firstName);
    }
    if (lastName !== undefined) {
      updates.push('last_name = ?');
      values.push(lastName);
    }
    if (role !== undefined) {
      updates.push('role = ?');
      values.push(role);
    }
    if (isActive !== undefined) {
      updates.push('is_active = ?');
      values.push(isActive ? 1 : 0);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(req.params.id);

    db.run(
      `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values,
      function(err: any) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ message: 'User updated successfully' });
      }
    );
  }
);

// Delete user
router.delete('/:id',
  authenticateToken,
  requireRole(['admin']),
  logActivity('delete_user'),
  (req: AuthenticatedRequest, res) => {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user?.userId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    db.run('DELETE FROM users WHERE id = ?', [req.params.id], function(err: any) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json({ message: 'User deleted successfully' });
    });
  }
);

// Get user activity logs
router.get('/:id/activity',
  authenticateToken,
  requireRole(['admin']),
  logActivity('get_user_activity'),
  (req, res) => {
    db.all(
      'SELECT * FROM activity_logs WHERE user_id = ? ORDER BY timestamp DESC LIMIT 100',
      [req.params.id],
      (err: any, logs: any) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        return res.json({ logs });
      }
    );
  }
);

// Get all activity logs (admin only)
router.get('/admin/activity-logs',
  authenticateToken,
  requireRole(['admin']),
  logActivity('get_all_activity_logs'),
  (req: AuthenticatedRequest, res: Response) => {
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 100;
    const offset = (page - 1) * limit;
    const action = req.query['action'] as string;
    
    let query = 'SELECT al.*, u.username, u.first_name, u.last_name FROM activity_logs al LEFT JOIN users u ON al.user_id = u.id';
    let countQuery = 'SELECT COUNT(*) as total FROM activity_logs al LEFT JOIN users u ON al.user_id = u.id';
    const params: any[] = [];
    
    if (action && action !== 'all') {
      query += ' WHERE al.action = ?';
      countQuery += ' WHERE al.action = ?';
      params.push(action);
    }
    
    query += ' ORDER BY al.timestamp DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    // Get total count
    db.get(countQuery, action && action !== 'all' ? [action] : [], (err: any, countResult: any) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Get logs
      db.all(query, params, (err: any, logs: any) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        
        return res.json({ 
          logs,
          pagination: {
            page,
            limit,
            total: countResult.total,
            totalPages: Math.ceil(countResult.total / limit)
          }
        });
      });
    });
  }
);

export default router; 