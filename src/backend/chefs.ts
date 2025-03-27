
import { Chef } from '@/types';

// Mock Chefs
const chefs: Chef[] = [
  {
    id: '1',
    name: 'Jordon Ram',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    speciality: 'French Cuisine',
    skills: ['Baking', 'Grilling', 'Sauces'],
    description: 'Award-winning chef specializing in French cuisine with over 20 years of experience.',
    available: true,
    hourlyRate: 150,
  },
  {
    id: '2',
    name: 'Sarvika Katuwal',
    image: 'https://i.pravatar.cc/300?img=35',
    speciality: 'Italian Cuisine',
    skills: ['Pasta', 'Mediterranean', 'Vegetarian'],
    description: 'Celebrity chef known for simple, delicious Italian recipes and healthy cooking.',
    available: true,
    hourlyRate: 120,
  },
  {
    id: '3',
    name: 'Aditya Jha',
    image: 'https://i.pravatar.cc/300?img=55',
    speciality: 'Home Cooking',
    skills: ['Desserts', 'Comfort Food', 'Entertaining'],
    description: 'Renowned for approachable home cooking with a touch of elegance and indulgence.',
    available: false,
    hourlyRate: 100,
  },
];

// CRUD operations for chefs
export const getChefs = (): Chef[] => {
  return chefs;
};

export const getChefById = (id: string): Chef | undefined => {
  return chefs.find(chef => chef.id === id);
};

export const createChef = (chef: Omit<Chef, 'id'>): Chef => {
  const newChef: Chef = {
    ...chef,
    id: (chefs.length + 1).toString(),
  };
  
  chefs.push(newChef);
  return newChef;
};

export const updateChef = (id: string, updates: Partial<Chef>): Chef | undefined => {
  const index = chefs.findIndex(chef => chef.id === id);
  if (index !== -1) {
    chefs[index] = { ...chefs[index], ...updates };
    return chefs[index];
  }
  return undefined;
};

export const deleteChef = (id: string): boolean => {
  const index = chefs.findIndex(chef => chef.id === id);
  if (index !== -1) {
    chefs.splice(index, 1);
    return true;
  }
  return false;
};
