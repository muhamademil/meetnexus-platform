
import { formatDistanceToNow } from "date-fns";
import { CalendarDays, MapPin, User } from "lucide-react";
import { Event } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Helper function to format currency in IDR
export const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: string) => void;
}

export function EventCard({ event, onViewDetails }: EventCardProps) {
  const timeUntilStart = formatDistanceToNow(new Date(event.startDate), { addSuffix: true });
  
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {event.isFree ? (
          <Badge className="absolute top-3 right-3 bg-green-600">Free</Badge>
        ) : (
          <Badge className="absolute top-3 right-3">{formatIDR(event.price)}</Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
          <CalendarDays size={16} />
          <span>{new Date(event.startDate).toLocaleDateString("id-ID")}</span>
          <span className="text-purple-500 font-medium">{timeUntilStart}</span>
        </div>
        <CardTitle className="line-clamp-1 group-hover:text-purple-500 transition-colors">
          {event.name}
        </CardTitle>
        <CardDescription className="flex items-center space-x-1">
          <MapPin size={16} />
          <span>{event.location}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-sm line-clamp-3">{event.description}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <User size={16} className="mr-1" />
          <span>By {event.organizerName}</span>
        </div>
        <Button 
          size="sm" 
          onClick={() => onViewDetails(event.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
