
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ChefHat, Calendar, User, Settings, Users, Plus, PenTool, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { getUserBookings, getChefs, getChefById, createChef, updateChef, deleteChef } from '@/lib/mockData';
import { Chef } from '@/types';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    speciality: '',
    skills: '',
    description: '',
    available: true,
    hourlyRate: 100,
  });

  useEffect(() => {
    if (user) {
      // Fetch bookings
      const userBookings = getUserBookings(user.id);
      // Add chef details to bookings
      const bookingsWithChefDetails = userBookings.map(booking => {
        const chef = getChefById(booking.chefId);
        return {
          ...booking,
          chef
        };
      });
      setBookings(bookingsWithChefDetails);
      
      // Fetch chefs for admin
      if (user.role === 'admin') {
        setChefs(getChefs());
      }
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleAddChef = () => {
    setSelectedChef(null);
    setFormData({
      name: '',
      image: 'https://i.pravatar.cc/300?img=' + Math.floor(Math.random() * 10),
      speciality: '',
      skills: '',
      description: '',
      available: true,
      hourlyRate: 100,
    });
    setIsDialogOpen(true);
  };

  const handleEditChef = (chef: Chef) => {
    setSelectedChef(chef);
    setFormData({
      name: chef.name,
      image: chef.image,
      speciality: chef.speciality,
      skills: chef.skills.join(', '),
      description: chef.description,
      available: chef.available,
      hourlyRate: chef.hourlyRate,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (chef: Chef) => {
    setSelectedChef(chef);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedChef) {
      deleteChef(selectedChef.id);
      setChefs(getChefs());
      toast.success('Chef deleted successfully');
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = () => {
    const newChefData = {
      name: formData.name,
      image: formData.image,
      speciality: formData.speciality,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      description: formData.description,
      available: formData.available,
      hourlyRate: formData.hourlyRate,
    };

    if (selectedChef) {
      // Update existing chef
      updateChef(selectedChef.id, newChefData);
      toast.success('Chef updated successfully');
    } else {
      // Create new chef
      createChef(newChefData);
      toast.success('Chef added successfully');
    }

    // Refresh the chef list
    setChefs(getChefs());
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">
            {user.role === 'admin' 
              ? 'Manage your chefs and bookings from your admin dashboard.' 
              : 'Manage your bookings and account from your personal dashboard.'}
          </p>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="bookings" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              My Bookings
            </TabsTrigger>
            {user.role === 'admin' && (
              <TabsTrigger value="chefs" className="flex items-center">
                <ChefHat className="h-4 w-4 mr-2" />
                Manage Chefs
              </TabsTrigger>
            )}
            <TabsTrigger value="account" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              My Account
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">My Bookings</h2>
              </div>
              
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-4 md:divide-x">
                      <div className="md:col-span-1 p-6 flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img 
                            src={booking.chef?.image || 'https://i.pravatar.cc/300'} 
                            alt={booking.chef?.name || 'Chef'} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{booking.chef?.name || 'Unknown Chef'}</h3>
                          <p className="text-sm text-muted-foreground">{booking.chef?.speciality || 'Chef'}</p>
                        </div>
                      </div>
                      
                      <div className="md:col-span-1 p-6">
                        <p className="text-sm text-muted-foreground mb-1">Date</p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                      
                      <div className="md:col-span-1 p-6">
                        <p className="text-sm text-muted-foreground mb-1">Time</p>
                        <p className="font-medium">{booking.startTime} - {booking.endTime}</p>
                      </div>
                      
                      <div className="md:col-span-1 p-6">
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`
                        }>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't made any bookings yet. Start by exploring our chefs.
                  </p>
                  <Link to="/chefs">
                    <Button>Browse Chefs</Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>
          
          {user.role === 'admin' && (
            <TabsContent value="chefs">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Manage Chefs</h2>
                  <Button onClick={handleAddChef}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Chef
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chefs.map((chef) => (
                    <Card key={chef.id} className="overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={chef.image} 
                          alt={chef.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-bold text-lg">{chef.name}</h3>
                          <p className="text-white/80 text-sm">{chef.speciality}</p>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${chef.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {chef.available ? 'Available' : 'Unavailable'}
                          </div>
                          <div className="text-sm font-medium">${chef.hourlyRate}/hr</div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {chef.skills.map((skill) => (
                            <span key={skill} className="bg-secondary text-foreground px-2 py-0.5 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {chef.description}
                        </p>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditChef(chef)}>
                            <PenTool className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(chef)}>
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="account">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>My Account</CardTitle>
                  <CardDescription>View and manage your account details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <div className="font-medium mt-1">{user.name}</div>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <div className="font-medium mt-1">{user.email}</div>
                      </div>
                    </div>
                    <div>
                      <Label>Role</Label>
                      <div className="font-medium mt-1 capitalize">{user.role}</div>
                    </div>
                    <div>
                      <Label>Account Status</Label>
                      <div className="font-medium mt-1 text-green-600">Active</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Account created on {format(new Date(), 'MMMM dd, yyyy')}
                  </p>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Chef Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedChef ? 'Edit Chef' : 'Add New Chef'}</DialogTitle>
            <DialogDescription>
              {selectedChef 
                ? 'Update the chef\'s information and click save when you\'re done.'
                : 'Fill in the chef\'s information and click save to add them to the system.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="speciality" className="text-right">
                Speciality
              </Label>
              <Input
                id="speciality"
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Separate skills with commas"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hourlyRate" className="text-right">
                Hourly Rate ($)
              </Label>
              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={handleNumberChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="available" className="text-right">
                Available
              </Label>
              <div className="col-span-3 flex items-center">
                <input
                  id="available"
                  name="available"
                  type="checkbox"
                  checked={formData.available}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mr-2"
                />
                <span className="text-sm text-muted-foreground">
                  Chef is available for booking
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedChef?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;
