
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ChefHat, Calendar, Clock, DollarSign, ArrowLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { getChefById, generateTimeSlots, createBooking } from '@/lib/mockData';
import { TimeSlot } from '@/types';
import { toast } from 'sonner';

const ChefDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const chef = getChefById(id || '');

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  
  // Calculate booking price
  const calculatePrice = () => {
    if (!chef || !selectedTimeSlot) return 0;
    
    // Assuming each time slot is 1 hour
    return chef.hourlyRate;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    
    if (date && chef) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const slots = generateTimeSlots(formattedDate, chef.id);
      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
    }
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookNow = () => {
    if (!user) {
      toast.error('Please login to book a chef');
      navigate('/login');
      return;
    }
    
    if (!chef || !selectedDate || !selectedTimeSlot) {
      toast.error('Please select a date and time');
      return;
    }
    
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const booking = {
      chefId: chef.id,
      userId: user.id,
      date: formattedDate,
      startTime: selectedTimeSlot.startTime,
      endTime: selectedTimeSlot.endTime,
      totalPrice: calculatePrice(),
    };
    
    createBooking(booking);
    
    toast.success('Booking confirmed successfully!');
    navigate('/dashboard');
  };

  if (!chef) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <ChefHat className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">Chef Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The chef you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/chefs')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chefs
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/chefs')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Chefs
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chef Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[3/2] relative">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{chef.name}</h1>
                  <p className="text-xl opacity-90">{chef.speciality}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {chef.skills.map((skill) => (
                    <span key={skill} className="bg-secondary text-foreground px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <div className="bg-primary/10 p-2 rounded-full mr-4">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hourly Rate</p>
                        <p className="text-lg font-bold">${chef.hourlyRate}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="flex items-center p-4">
                      <div className="bg-primary/10 p-2 rounded-full mr-4">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="text-lg font-bold">10+ Years</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-muted-foreground mb-6">{chef.description}</p>
                  
                  <h3 className="text-xl font-bold mb-3">Expertise</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-1 text-muted-foreground">
                    <li>Professional culinary training from top culinary school</li>
                    <li>Specializes in {chef.speciality} with a modern twist</li>
                    <li>Experience in high-end restaurants and private events</li>
                    <li>Custom menu creation based on client preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Panel */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-chef-accent" />
                Book This Chef
              </h2>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Select a date:</p>
                <div className="border rounded-md p-3">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      // Disable dates in the past
                      return date < new Date();
                    }}
                    className="mx-auto pointer-events-auto"
                  />
                </div>
              </div>
              
              {selectedDate && timeSlots.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Select a time:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && handleTimeSlotSelect(slot)}
                        disabled={!slot.available}
                        className={`
                          p-3 rounded-md text-sm flex items-center justify-center transition-colors
                          ${selectedTimeSlot?.id === slot.id 
                            ? 'bg-primary text-white'
                            : slot.available 
                              ? 'bg-secondary hover:bg-secondary/80 text-foreground'
                              : 'bg-muted text-muted-foreground cursor-not-allowed'
                          }
                        `}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {slot.startTime}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTimeSlot && (
                <div className="mb-6 p-4 bg-secondary rounded-md">
                  <h3 className="font-medium mb-2">Booking Summary</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chef:</span>
                      <span className="font-medium">{chef.name}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${calculatePrice()}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full"
                disabled={!selectedTimeSlot}
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChefDetail;
