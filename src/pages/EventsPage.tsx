
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EventCard } from "@/components/events/event-card";
import { EventSearch } from "@/components/events/event-search";
import { mockEvents } from "@/data/mock-data";
import { Event } from "@/types";

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);

  useEffect(() => {
    // Filter events based on search, category, and location
    const filtered = mockEvents.filter((event) => {
      const matchesSearch = 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      
      const matchesLocation = selectedLocation === "All" || event.location.includes(selectedLocation);
      
      return matchesSearch && matchesCategory && matchesLocation;
    });

    // Sort events by date (most recent first)
    const sorted = [...filtered].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    setFilteredEvents(sorted);
  }, [searchQuery, selectedCategory, selectedLocation]);

  const handleViewDetails = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-purple-50 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Browse Events</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover and join events that match your interests
          </p>
          
          <EventSearch 
            onSearch={setSearchQuery} 
            onCategoryChange={setSelectedCategory} 
            onLocationChange={setSelectedLocation} 
          />
        </div>
      </div>
      
      <div className="container py-8">
        <div className="mb-6">
          <h2 className="text-lg font-medium">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </h2>
        </div>
        
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find events
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default EventsPage;
