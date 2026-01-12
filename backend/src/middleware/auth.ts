import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/db';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    username: string;
    role?: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'fallback-secret') as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check role from JWT token instead of database for better performance
    const userRole = req.user.role || 'user';
    
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

export const logActivity = (action: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    res.send = function(data) {
      // Log activity after response is sent
      if (req.user) {
        const details = JSON.stringify({
          method: req.method,
          path: req.path,
          body: req.body,
          response: data
        });

        db.run(
          'INSERT INTO activity_logs (id, user_id, action, details, ip_address) VALUES (?, ?, ?, ?, ?)',
          [
            require('uuid').v4(),
            req.user.userId,
            action,
            details,
            req.ip || req.connection.remoteAddress
          ]
        );
      }
      
      return originalSend.call(this, data);
    };
    next();
  };
}; 