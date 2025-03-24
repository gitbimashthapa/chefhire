
import { ChefHat, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-chef-DEFAULT text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6" />
              <h3 className="text-xl font-bold">ChefHire</h3>
            </div>
            <p className="text-white max-w-xs">
              Connecting you with professional chefs for your private dining needs.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-white hover:text-chef-accent transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-chef-accent transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-white hover:text-chef-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-chef-accent" />
                <span className="text-white">contact@chefhire.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-chef-accent" />
                <span className="text-white">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-chef-accent" />
                <span className="text-white">123 Culinary Ave, Kitchen City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-white">
          <p>&copy; {new Date().getFullYear()} ChefHire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
