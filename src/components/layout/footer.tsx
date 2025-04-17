
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MeetNexus</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Find and organize events that match your interests and connect with people.
            </p>
          </div>

          <div>
            <h3 className="text-md font-medium mb-4">For Attendees</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/my-tickets" className="text-muted-foreground hover:text-primary">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link to="/referrals" className="text-muted-foreground hover:text-primary">
                  Referral Program
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-medium mb-4">For Organizers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/create-event" className="text-muted-foreground hover:text-primary">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary">
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-muted-foreground hover:text-primary">
                  Event Promotions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MeetNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
