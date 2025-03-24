
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToChefs = () => {
    if (location.pathname === '/') {
      const chefsSection = document.getElementById('featured-chefs');
      if (chefsSection) {
        chefsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#featured-chefs';
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out',
        scrolled ? 'bg-white shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container flex justify-between items-center mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-chef-accent" />
          <span className="text-2xl font-bold text-foreground">ChefHire</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-chef-accent transition-colors">
            Home
          </Link>
          <button 
            onClick={scrollToChefs} 
            className="text-foreground hover:text-chef-accent transition-colors bg-transparent border-none cursor-pointer"
          >
            Find a Chef
          </button>
          <Link to="/about" className="text-foreground hover:text-chef-accent transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-foreground hover:text-chef-accent transition-colors">
            Contact
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-foreground hover:text-chef-accent transition-colors">
                Dashboard
              </Link>
              <Button onClick={logout} variant="outline">
                Log Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="default" className="animate-fadeIn">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="animate-fadeIn">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass mt-2 py-4 px-6 animate-slideUp">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-foreground hover:text-chef-accent transition-colors py-2">
              Home
            </Link>
            <button 
              onClick={scrollToChefs} 
              className="text-foreground hover:text-chef-accent transition-colors bg-transparent border-none cursor-pointer text-left py-2"
            >
              Find a Chef
            </button>
            <Link to="/about" className="text-foreground hover:text-chef-accent transition-colors py-2">
              About Us
            </Link>
            <Link to="/contact" className="text-foreground hover:text-chef-accent transition-colors py-2">
              Contact
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-foreground hover:text-chef-accent transition-colors py-2">
                  Dashboard
                </Link>
                <Button onClick={logout} variant="outline" className="w-full">
                  Log Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" className="w-full">
                  <Button variant="default" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
