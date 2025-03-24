
import { User } from '@/types';

// Mock Users
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'user',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'admin',
  },
  {
    id: '3',
    name: 'Chef Gordon',
    email: 'chef@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'chef',
  },
];

// Authentication functions
export const login = (email: string, password: string): User | null => {
  try {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const userWithoutPassword = { ...user };
      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    return null;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const register = (name: string, email: string, password: string): User | null => {
  try {
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return null;
    }
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      password,
      role: 'user',
    };
    
    users.push(newUser);
    
    // Store user in localStorage (without password for security in a real app)
    const userWithoutPassword = { ...newUser };
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  } catch (error) {
    console.error("Register error:", error);
    return null;
  }
};

export const logout = (): void => {
  try {
    localStorage.removeItem('currentUser');
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};
