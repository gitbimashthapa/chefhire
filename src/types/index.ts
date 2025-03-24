
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed on the backend
  role: 'user' | 'admin' | 'chef';
}

export interface Chef {
  id: string;
  name: string;
  image: string;
  speciality: string;
  skills: string[];
  description: string;
  available: boolean;
  hourlyRate: number;
}

export interface Booking {
  id: string;
  chefId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}
