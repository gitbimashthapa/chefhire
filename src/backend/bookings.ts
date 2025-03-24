
import { Booking, TimeSlot } from '@/types';

// In a real app, we would store this in a database
// Since we're using localStorage for persistence, we'll initialize from there
const getStoredBookings = (): Booking[] => {
  const storedBookings = localStorage.getItem('bookings');
  return storedBookings ? JSON.parse(storedBookings) : [];
};

// Initialize bookings from localStorage if available
let bookings: Booking[] = getStoredBookings();

// Save bookings to localStorage
const saveBookings = () => {
  localStorage.setItem('bookings', JSON.stringify(bookings));
};

// Generate time slots for a specific date
export const generateTimeSlots = (date: string, chefId: string): TimeSlot[] => {
  const existingBookings = bookings.filter(
    booking => booking.date === date && booking.chefId === chefId
  );
  
  const bookedTimes = existingBookings.map(booking => ({
    start: booking.startTime,
    end: booking.endTime,
  }));
  
  const slots: TimeSlot[] = [];
  
  // Generate slots from 9 AM to 9 PM in 1-hour increments
  for (let hour = 9; hour < 21; hour++) {
    const startTime = `${hour}:00`;
    const endTime = `${hour + 1}:00`;
    
    // Check if this slot overlaps with any booking
    const isAvailable = !bookedTimes.some(
      time => 
        (startTime >= time.start && startTime < time.end) || 
        (endTime > time.start && endTime <= time.end) ||
        (startTime <= time.start && endTime >= time.end)
    );
    
    slots.push({
      id: `${date}-${hour}`,
      startTime,
      endTime,
      available: isAvailable,
    });
  }
  
  return slots;
};

// Booking operations
export const createBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: (bookings.length + 1).toString(),
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };
  
  bookings.push(newBooking);
  saveBookings(); // Save to localStorage
  
  return newBooking;
};

export const getUserBookings = (userId: string): Booking[] => {
  return bookings.filter(booking => booking.userId === userId);
};
