import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { getChefs } from "@/lib/mockData";
import { Chef } from "@/types";

const Home = () => {
  const featuredChefs: Chef[] = getChefs().slice(0, 3);

  const scrollToChefs = () => {
    const chefsSection = document.getElementById("featured-chefs");
    if (chefsSection) {
      chefsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
              Hire Professional Chefs for Private Events
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl animate-fadeIn fade-in-delay-1">
              Experience exceptional cuisine in the comfort of your home with
              our carefully selected professional chefs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn fade-in-delay-2">
              <Button size="lg" className="px-8" onClick={scrollToChefs}>
                Find a Chef
              </Button>
              <Link to="/about">
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How ChefHire Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Booking a chef through ChefHire is simple and convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-green-200 border-none shadow-md text-center p-6 animate-slideUp">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Select a Chef</h3>
                <p className="text-muted-foreground">
                  Browse through our selection of professional chefs and find
                  the perfect match for your culinary needs.
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-green-200 border-none shadow-md text-center p-6 animate-slideUp"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Book a Date</h3>
                <p className="text-muted-foreground">
                  Choose a convenient date and time for your chef to come and
                  prepare a delicious meal for you.
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-green-200 border-none shadow-md text-center p-6 animate-slideUp"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Make Payment</h3>
                <p className="text-muted-foreground">
                  Secure your booking with a simple payment process and get
                  ready to enjoy a professional culinary experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Chefs */}
      <section id="featured-chefs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Featured Chefs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet some of our highly skilled and experienced professional
              chefs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredChefs.map((chef, index) => (
              <Card
                key={chef.id}
                className="bg-green-200 overflow-hidden transition-all duration-300 hover:shadow-lg animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{chef.name}</h3>
                      <p className="text-chef-accent">{chef.speciality}</p>
                    </div>
                    <div className="bg-chef-accent/10 text-chef-accent px-3 py-1 rounded-full text-sm font-medium">
                      Rs.{chef.hourlyRate}/hr
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {chef.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-secondary text-foreground px-3 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {chef.description}
                  </p>

                  <div className="flex justify-end">
                    <Link to={`/chefs/${chef.id}`}>
                      <Button variant="outline">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
