
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PaymentForm } from "@/components/events/payment-form";
import { mockEvents, mockUsers } from "@/data/mock-data";

const TransactionPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState(mockEvents.find(e => e.id === eventId));
  const [quantity, setQuantity] = useState(1);
  
  // In a real app, this would come from the authenticated user
  const currentUser = mockUsers[0];

  useEffect(() => {
    // If event not found, navigate to 404
    if (!event) {
      navigate("/404");
    }
  }, [event, navigate]);

  if (!event) return null;

  const totalPrice = event.price * quantity;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isLoggedIn={true}
        userInitials={currentUser.name.split(' ').map(n => n[0]).join('')}
        userImage={currentUser.profileImage}
        userName={currentUser.name}
        userPoints={currentUser.points}
      />
      
      <div className="bg-purple-50 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-lg text-muted-foreground">
            Secure your tickets for {event.name}
          </p>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaymentForm 
              eventName={event.name}
              eventDate={new Date(event.startDate)}
              totalPrice={totalPrice}
              quantity={quantity}
              availablePoints={currentUser.points}
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg overflow-hidden border bg-background sticky top-20">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {new Date(event.startDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm line-clamp-3 mb-4">{event.description}</p>
                <p className="text-muted-foreground text-sm">
                  Location: {event.location}
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

export default TransactionPage;
