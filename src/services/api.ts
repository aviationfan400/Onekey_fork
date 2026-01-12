// Mock API Service using localStorage
// This replaces the backend dependency to allow the app to function fully client-side

import { apiService as firebaseService } from './firebaseService';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: boolean;
}

export interface TimelineEvent {
  id: string;
  name: string;
  date: string;
  category: string;
  location?: string;
  time?: string;
  attendees?: string;
  performers?: string;
  duration?: string;
  description?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEventRequest {
  name: string;
  date: string;
  category: string;
  location?: string;
  time?: string;
  attendees?: string;
  performers?: string;
  duration?: string;
  description?: string;
  photo_url?: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  userId?: string;
  action: string;
  details: string;
  ip_address?: string;
  ipAddress?: string;
  timestamp: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'onekey_users',
  EVENTS: 'onekey_events',
  LOGS: 'onekey_logs',
  TOKEN: 'onekey_auth_token'
};

// Default Admin User
const DEFAULT_ADMIN: User & { passwordHash: string } = {
  id: 'admin-1',
  username: 'curtiswei',
  email: 'curtiswei@onekey.com',
  firstName: 'Curtis',
  lastName: 'Wei',
  role: 'super_admin',
  isActive: true,
  createdAt: new Date().toISOString(),
  passwordHash: 'curtiswei' // Simple mock password
};

class MockApiService {
  private token: string | null = null;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize Users
    let users: any[] = [];
    try {
      const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      users = storedUsers ? JSON.parse(storedUsers) : [];
    } catch (e) {
      users = [];
    }

    // cleanup old admin if exists
    users = users.filter(u => u.username !== 'admin');

    // Ensure current default admin exists and is up to date
    const adminIndex = users.findIndex(u => u.username === DEFAULT_ADMIN.username);
    if (adminIndex >= 0) {
      // Update existing admin to ensure credentials are correct
      users[adminIndex] = { ...users[adminIndex], ...DEFAULT_ADMIN };
    } else {
      // Add new admin
      users.push(DEFAULT_ADMIN);
    }
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Initialize Events if empty
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify([]));
    }

    // Initialize Logs if empty
    if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify([]));
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }

  // Helper to simulate async delay
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    await this.delay();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find((u: any) => u.username === credentials.username && u.passwordHash === credentials.password);

    if (user) {
      const token = `mock-token-${Date.now()}`;
      this.setToken(token);
      
      // Update last login
      user.lastLoginAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      return {
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          }
        }
      };
    }

    return { success: false, error: 'Invalid credentials' };
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    await this.delay(200);
    const token = this.getToken();
    if (!token) return { success: false, error: 'Not authenticated' };

    // For mock purposes, we'll just return the first admin user or the user associated with the token if we tracked it
    // In a real mock, we'd store token->userId mapping. Here we'll simplify.
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    // Return the admin user for now or the first active user
    const user = users.find((u: User) => u.isActive) || users[0];

    return { success: true, data: { user } };
  }

  // User Management
  async getUsers(): Promise<ApiResponse<{ users: User[] }>> {
    await this.delay();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    // Remove password hash before returning
    const safeUsers = users.map(({ passwordHash, ...user }: any) => user);
    return { success: true, data: { users: safeUsers } };
  }

  async createUser(userData: CreateUserRequest): Promise<ApiResponse<{ userId: string; message: string }>> {
    await this.delay();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    if (users.find((u: any) => u.username === userData.username)) {
      return { success: false, error: 'Username already exists' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      passwordHash: userData.password, // In real app, hash this!
      isActive: true,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    return { success: true, data: { userId: newUser.id, message: 'User created' } };
  }

  async updateUser(userId: string, userData: UpdateUserRequest): Promise<ApiResponse<{ message: string }>> {
    await this.delay();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const index = users.findIndex((u: any) => u.id === userId);

    if (index === -1) return { success: false, error: 'User not found' };

    users[index] = { ...users[index], ...userData };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    return { success: true, data: { message: 'User updated' } };
  }

  async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    await this.delay();
    let users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    users = users.filter((u: any) => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    return { success: true, data: { message: 'User deleted' } };
  }

  // Activity Logs
  async getAllActivityLogs(page: number = 1, limit: number = 100, action: string = 'all'): Promise<ApiResponse<{ 
    logs: ActivityLog[], 
    pagination: { page: number, limit: number, total: number, totalPages: number } 
  }>> {
    await this.delay();
    let logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
    
    if (action !== 'all') {
      logs = logs.filter((l: any) => l.action === action);
    }

    // Sort by timestamp desc
    logs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const total = logs.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedLogs = logs.slice(start, start + limit);

    return {
      success: true,
      data: {
        logs: paginatedLogs,
        pagination: { page, limit, total, totalPages }
      }
    };
  }

  // Timeline Events
  async getEvents(): Promise<ApiResponse<{ events: TimelineEvent[] }>> {
    await this.delay();
    const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
    return { success: true, data: { events } };
  }

  async createEvent(eventData: CreateEventRequest): Promise<ApiResponse<{ id: string; message: string }>> {
    await this.delay();
    const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
    
    const newEvent = {
      id: `event-${Date.now()}`,
      ...eventData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    events.push(newEvent);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));

    return { success: true, data: { id: newEvent.id, message: 'Event created' } };
  }

  async updateEvent(eventId: string, eventData: CreateEventRequest): Promise<ApiResponse<{ message: string }>> {
    await this.delay();
    const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
    const index = events.findIndex((e: any) => e.id === eventId);

    if (index === -1) return { success: false, error: 'Event not found' };

    events[index] = { 
      ...events[index], 
      ...eventData, 
      updated_at: new Date().toISOString() 
    };
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));

    return { success: true, data: { message: 'Event updated' } };
  }

  async deleteEvent(eventId: string): Promise<ApiResponse<{ message: string }>> {
    await this.delay();
    let events = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
    events = events.filter((e: any) => e.id !== eventId);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));

    return { success: true, data: { message: 'Event deleted' } };
  }

  // File Upload (Mock)
  async uploadImage(file: File): Promise<ApiResponse<{ filePath: string; filename: string; originalName: string; size: number }>> {
    await this.delay(1000);
    
    // In a real mock, we'd convert to base64 and store, but for now just return a fake URL or the base64 itself if small enough
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          success: true,
          data: {
            filePath: reader.result as string, // Return base64 as the "path"
            filename: file.name,
            originalName: file.name,
            size: file.size
          }
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return {
      success: true,
      data: { status: 'ok', timestamp: new Date().toISOString() }
    };
  }
}

// export const apiService = new MockApiService();
export const apiService = firebaseService;