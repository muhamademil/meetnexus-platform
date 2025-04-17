
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isLoggedIn?: boolean;
  userInitials?: string;
  userImage?: string;
  userName?: string;
  userPoints?: number;
}

export function Navbar({
  isLoggedIn = false,
  userInitials = "NA",
  userImage,
  userName = "User",
  userPoints = 0,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium hover:text-primary">
                  Home
                </Link>
                <Link to="/events" className="text-lg font-medium hover:text-primary">
                  Browse Events
                </Link>
                {isLoggedIn && (
                  <>
                    <Link to="/my-tickets" className="text-lg font-medium hover:text-primary">
                      My Tickets
                    </Link>
                    <Link to="/dashboard" className="text-lg font-medium hover:text-primary">
                      Dashboard
                    </Link>
                  </>
                )}
                {!isLoggedIn && (
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild size="sm">
                      <Link to="/auth">Sign In</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/auth?tab=register">Create Account</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">MeetNexus</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/events" className="font-medium transition-colors hover:text-primary">
              Browse Events
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/my-tickets" className="font-medium transition-colors hover:text-primary">
                  My Tickets
                </Link>
                <Link to="/dashboard" className="font-medium transition-colors hover:text-primary">
                  Dashboard
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
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
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{userName}</p>
                      <p className="text-sm text-muted-foreground">
                        {userPoints.toLocaleString()} points
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-tickets">My Tickets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/auth?tab=register">Create Account</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
