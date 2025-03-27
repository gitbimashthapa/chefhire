import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-chef-DEFAULT text-Black py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold">ChefHire</h3>
            </div>
            <p className="text-Black max-w-xs">
              Connecting you with professional chefs for your private dining
              needs.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-Black hover:text-chef-accent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-Black hover:text-chef-accent transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-Black hover:text-chef-accent transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-chef-accent" />
                <span className="text-black">contact@chefhire.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-chef-accent" />
                <span className="text-black">+977 9820307878</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-chef-accent" />
                <span className="text-black">
                  12 road itahari, Kitchen Town
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-black-200">
          <p>
            &copy; {new Date().getFullYear()} ChefHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
