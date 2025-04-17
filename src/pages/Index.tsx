
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EventCard } from "@/components/events/event-card";
import { EventSearch } from "@/components/events/event-search";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/data/mock-data";
import { Event } from "@/types";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Filter events based on search, category, and location
  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    const matchesLocation = selectedLocation === "All" || event.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Sort events by date (most recent first)
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  // Featured events (first 3 events)
  const featuredEvents = sortedEvents.slice(0, 3);

  // Navigate to event details
  const handleViewDetails = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-purple-800 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-600 opacity-90"></div>
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover & Join Amazing Events
            </h1>
            <p className="text-lg md:text-xl mb-8 text-purple-100">
              Find and book tickets for the best events happening in your city or create your own event today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-800 hover:bg-purple-100" onClick={() => navigate("/events")}>
                Browse Events
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate("/create-event")}>
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container -mt-8 mb-12 relative z-20">
        <EventSearch 
          onSearch={setSearchQuery} 
          onCategoryChange={setSelectedCategory} 
          onLocationChange={setSelectedLocation} 
        />
      </section>

      {/* Featured Events Section */}
      <section className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Events</h2>
          <Button variant="ghost" onClick={() => navigate("/events")}>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse By Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Technology', 'Music', 'Business', 'Food & Drink'].map((category) => (
              <div 
                key={category}
                className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category);
                  navigate("/events");
                }}
              >
                {category === 'Technology' && <TrendingUp className="mx-auto mb-3 h-8 w-8 text-purple-500" />}
                {category === 'Music' && <Calendar className="mx-auto mb-3 h-8 w-8 text-purple-500" />}
                {category === 'Business' && <MapPin className="mx-auto mb-3 h-8 w-8 text-purple-500" />}
                {category === 'Food & Drink' && <Calendar className="mx-auto mb-3 h-8 w-8 text-purple-500" />}
                <h3 className="font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Find Events</h3>
            <p className="text-muted-foreground">
              Browse and discover events that match your interests in your area.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Book Tickets</h3>
            <p className="text-muted-foreground">
              Purchase tickets securely and get instant confirmation.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Attend & Enjoy</h3>
            <p className="text-muted-foreground">
              Get reminder notifications and attend events hassle-free.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create your own event?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who are using MeetNexus to create, promote, and manage their events.
          </p>
          <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100" onClick={() => navigate("/create-event")}>
            Get Started
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
