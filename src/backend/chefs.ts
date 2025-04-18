
import { Chef } from '@/types';

// Mock Chefs
const chefs: Chef[] = [
  {
    id: '1',
    name: 'Bikash Karki',
    image: 'https://i.pravatar.cc/300?img=12',
    speciality: 'French Cuisine',
    skills: ['Baking', 'Grilling', 'Sauces'],
    description: 'Award-winning chef specializing in French cuisine with over 20 years of experience.',
    available: true,
    hourlyRate: 3500,
  },
  {
    id: '2',
    name: 'Aashika Rai',
    image: 'https://i.pravatar.cc/300?img=9',
    speciality: 'Italian Cuisine',
    skills: ['Pasta', 'Mediterranean', 'Vegetarian'],
    description: 'Celebrity chef known for simple, delicious Italian recipes and healthy cooking.',
    available: true,
    hourlyRate: 2500,
  },
  {
    id: '3',
    name: 'Aditya Jha',
    image: 'https://i.pravatar.cc/300?img=68',
    speciality: 'Home Cooking',
    skills: ['Desserts', 'Comfort Food', 'Entertaining'],
    description: 'Renowned for approachable home cooking with a touch of elegance and indulgence.',
    available: false,
    hourlyRate: 2000,
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
