
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Share2, Star, Ticket, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockEvents } from "@/data/mock-data";
import { formatIDR } from "@/components/events/event-card";

const EventDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState(mockEvents.find(e => e.id === eventId));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // If event not found, navigate to 404
    if (!event) {
      navigate("/404");
    }
  }, [event, navigate]);

  if (!event) return null;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= event.availableSeats) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = event.price * quantity;
  const formattedStartDate = new Date(event.startDate).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedStartTime = new Date(event.startDate).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndDate = new Date(event.endDate).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndTime = new Date(event.endDate).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeUntilStart = formatDistanceToNow(new Date(event.startDate), { addSuffix: true });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-purple-50 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Event Image */}
            <div className="w-full md:w-2/3">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Event Quick Details */}
            <div className="w-full md:w-1/3 sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-purple-600 font-medium mb-2">
                      {event.category}
                    </div>
                    <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <Calendar size={16} />
                      <span>
                        {formattedStartDate} • {formattedStartTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <User size={16} />
                      <span>By {event.organizerName}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Price</span>
                      <span className="text-lg font-bold">
                        {event.isFree ? "Free" : formatIDR(event.price)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium">Available Seats</span>
                      <span className="text-sm">{event.availableSeats}</span>
                    </div>

                    {!event.isFree && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-medium">Quantity</div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= event.availableSeats}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    )}

                    {!event.isFree && (
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium">Total</span>
                        <span className="text-lg font-bold">{formatIDR(totalPrice)}</span>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => navigate(`/transaction/${event.id}`)}
                    >
                      {event.isFree ? "Register" : "Buy Tickets"}
                    </Button>
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Share2 size={16} />
                      Share
                    </Button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-purple-600 font-medium">
                      {timeUntilStart}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Event Description */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="whitespace-pre-line">{event.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Date and Time</h2>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Calendar className="text-purple-500 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium">Start</p>
                    <p>{formattedStartDate}</p>
                    <p className="text-muted-foreground">{formattedStartTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-purple-500 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium">End</p>
                    <p>{formattedEndDate}</p>
                    <p className="text-muted-foreground">{formattedEndTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="flex items-start gap-3">
                <MapPin className="text-purple-500 mt-0.5" size={20} />
                <div>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Organizer</h2>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium">{event.organizerName}</h3>
                  <p className="text-sm text-muted-foreground">Event Organizer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-20">
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Ticket size={18} />
                  Refund Policy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tickets for this event are non-refundable, except in the case of event cancellation.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Star size={18} />
                  Reviews
                </h3>
                <p className="text-sm text-muted-foreground">
                  Reviews will be available after the event has ended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetailPage;
