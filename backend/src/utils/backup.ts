import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

const dbPath = process.env['DB_PATH'] || path.join(__dirname, '../../data/onekey.db');
const backupDir = process.env['DB_BACKUP_PATH'] || path.join(__dirname, '../../data/backups');

export class DatabaseBackup {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
  }

  async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupId = uuidv4().substring(0, 8);
    const backupFileName = `onekey-backup-${timestamp}-${backupId}.db`;
    const backupPath = path.join(backupDir, backupFileName);

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      const backupDb = new sqlite3.Database(backupPath);
      
      this.db.backup(backupDb, (err) => {
        if (err) {
          backupDb.close();
          reject(err);
        } else {
          backupDb.close();
          console.log(`Database backup created: ${backupFileName}`);
          resolve(backupPath);
        }
      });
    });
  }

  async cleanupOldBackups(retentionDays: number = 30): Promise<void> {
    if (!fs.existsSync(backupDir)) {
      return;
    }

    const files = fs.readdirSync(backupDir);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    for (const file of files) {
      if (file.endsWith('.db')) {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime < cutoffDate) {
          fs.unlinkSync(filePath);
          console.log(`Deleted old backup: ${file}`);
        }
      }
    }
  }

  async getBackupInfo(): Promise<{ totalBackups: number; totalSize: number; oldestBackup?: Date; newestBackup?: Date }> {
    if (!fs.existsSync(backupDir)) {
      return { totalBackups: 0, totalSize: 0 };
    }

    const files = fs.readdirSync(backupDir).filter(file => file.endsWith('.db'));
    let totalSize = 0;
    let oldestDate: Date | undefined;
    let newestDate: Date | undefined;

    for (const file of files) {
      const filePath = path.join(backupDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;

      if (!oldestDate || stats.mtime < oldestDate) {
        oldestDate = stats.mtime;
      }
      if (!newestDate || stats.mtime > newestDate) {
        newestDate = stats.mtime;
      }
    }

    return {
      totalBackups: files.length,
      totalSize,
      oldestBackup: oldestDate,
      newestBackup: newestDate
    };
  }

  async restoreBackup(backupPath: string): Promise<void> {
    if (!fs.existsSync(backupPath)) {
      throw new Error('Backup file not found');
    }

    return new Promise((resolve, reject) => {
      const backupDb = new sqlite3.Database(backupPath);
      
      backupDb.backup(this.db, (err) => {
        if (err) {
          backupDb.close();
          reject(err);
        } else {
          backupDb.close();
          console.log('Database restored successfully');
          resolve();
        }
      });
    });
  }

  close(): void {
    this.db.close();
  }
}

// Auto-backup functionality
export const scheduleBackup = (cron: any) => {
  const backup = new DatabaseBackup();
  
  // Schedule daily backup at 2 AM
  cron.schedule('0 2 * * *', async () => {
    try {
      await backup.createBackup();
      await backup.cleanupOldBackups(parseInt(process.env['BACKUP_RETENTION_DAYS'] || '30'));
    } catch (error) {
      console.error('Backup failed:', error);
    }
  });

  console.log('Database backup scheduled for daily at 2 AM');
}; 