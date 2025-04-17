
import { Calendar, MapPin, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: string) => void;
}

// Helper function to format currency
export const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function EventCard({ event, onViewDetails }: EventCardProps) {
  const formattedDate = new Date(event.startDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  
  const timeUntilEvent = formatDistanceToNow(new Date(event.startDate), { addSuffix: true });
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={event.isFree ? "secondary" : "default"} className={event.isFree ? "bg-green-500" : "bg-purple-500"}>
            {event.isFree ? "Free" : formatIDR(event.price)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-1 pt-4">
        <div className="text-sm text-purple-600 font-medium mb-1">{event.category}</div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{event.name}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-4 w-4 mr-1" />
          <span>By {event.organizerName}</span>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <span className="text-sm text-muted-foreground">{timeUntilEvent}</span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(event.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
