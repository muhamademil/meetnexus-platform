
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatIDR } from "@/components/events/event-card";

interface NavbarProps {
  isLoggedIn?: boolean;
  userInitials?: string;
  userImage?: string;
  userName?: string;
  userPoints?: number;
}

export function Navbar({
  isLoggedIn = false,
  userInitials = "",
  userImage = "",
  userName = "",
  userPoints = 0,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-purple-600 mr-8">
            MeetNexus
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm transition-colors hover:text-purple-600 ${
                isActive("/") ? "text-purple-600 font-medium" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`text-sm transition-colors hover:text-purple-600 ${
                isActive("/events") ? "text-purple-600 font-medium" : "text-foreground"
              }`}
            >
              Browse Events
            </Link>
            <Link
              to="/create-event"
              className={`text-sm transition-colors hover:text-purple-600 ${
                isActive("/create-event") ? "text-purple-600 font-medium" : "text-foreground"
              }`}
            >
              Create Event
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm transition-colors hover:text-purple-600 ${
                isActive("/dashboard") ? "text-purple-600 font-medium" : "text-foreground"
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userImage} alt={userName} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userPoints > 0 ? `${formatIDR(userPoints)} points` : "No points"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth?tab=register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link
              to="/"
              className={`block px-4 py-2 rounded-md ${
                isActive("/") ? "bg-purple-50 text-purple-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`block px-4 py-2 rounded-md ${
                isActive("/events") ? "bg-purple-50 text-purple-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Events
            </Link>
            <Link
              to="/create-event"
              className={`block px-4 py-2 rounded-md ${
                isActive("/create-event") ? "bg-purple-50 text-purple-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Create Event
            </Link>
            <Link
              to="/dashboard"
              className={`block px-4 py-2 rounded-md ${
                isActive("/dashboard") ? "bg-purple-50 text-purple-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
