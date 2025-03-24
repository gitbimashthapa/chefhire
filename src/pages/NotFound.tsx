
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { ChefHat } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-8">
            <ChefHat className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-6">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for has either been moved or doesn't exist.
          </p>
          <Button asChild size="lg">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
