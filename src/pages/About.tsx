import { ChefHat, Award, Heart, Globe } from "lucide-react";
import { Layout } from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-6 animate-fadeIn">
              About ChefHire
            </h1>
            <p className="text-xl text-muted-foreground animate-fadeIn fade-in-delay-1">
              Connecting exceptional culinary talent with those who appreciate
              fine dining experiences in the comfort of their homes.
            </p>
          </div>

          <div className="bg-green-300 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slideInLeft">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  At ChefHire, we're on a mission to transform the way people
                  experience fine dining. We believe that exceptional culinary
                  experiences shouldn't be limited to restaurants. Our platform
                  connects talented professional chefs with clients looking for
                  personalized dining experiences in their homes.
                </p>
                <p className="text-muted-foreground">
                  Whether it's a special celebration, an intimate dinner, or a
                  weekly meal service, we're here to make it memorable with the
                  perfect chef for every occasion.
                </p>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                    alt="Chef preparing a meal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-blue rounded-lg shadow-lg p-4 max-w-xs hidden md:block"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-blue rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From a simple idea to a growing platform connecting culinary
                talent with food enthusiasts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                    alt="Chef teaching"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Our team's passion for food and hospitality drives everything
                  we do. We believe that food brings people together, creates
                  memories, and enriches lives. By making professional chef
                  services more accessible, we're helping people create
                  unforgettable dining experiences without leaving home.
                </p>
                <p className="text-muted-foreground">
                  Today, ChefHire continues to grow, adding new talented chefs
                  and expanding to new regions. Our commitment to quality,
                  personalization, and exceptional service remains at the core
                  of our mission.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Join the ChefHire Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're looking to hire a chef for a special occasion or
              you're a culinary professional looking to showcase your skills,
              ChefHire is the platform for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/chefs">
                <button className="bg-chef-accent text-blue px-6 py-3 rounded-lg font-medium">
                  Hire a Chef
                </button>
              </a>
              <a href="/contact">
                <button
                  className="bg-blue
                
                border border-chef-accent text-chef-accent px-6 py-3 rounded-lg font-medium"
                >
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
