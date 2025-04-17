
import { useState, useEffect } from "react";
import { Search, MapPin, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EventSearchProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
}

export function EventSearch({
  onSearch,
  onCategoryChange,
  onLocationChange,
}: EventSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Categories and locations could come from API in a real app
  const categories = ["All", "Technology", "Music", "Business", "Food & Drink", "Arts", "Sports"];
  const locations = ["All", "Jakarta", "Surabaya", "Bandung", "Yogyakarta", "Bali"];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Trigger search when debounced value changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <Card className="p-4 md:p-6 shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <div className="absolute top-3 left-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
            </div>
            <select
              className="h-10 w-full min-w-[140px] pl-9 pr-4 rounded-md border border-input bg-background text-sm"
              onChange={(e) => onCategoryChange(e.target.value)}
              defaultValue="All"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute top-3 left-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <select
              className="h-10 w-full min-w-[140px] pl-9 pr-4 rounded-md border border-input bg-background text-sm"
              onChange={(e) => onLocationChange(e.target.value)}
              defaultValue="All"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
}
