import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ListChecks, LayoutDashboard, Settings, Users, Plus } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { TransactionTable } from "@/components/dashboard/transaction-table";
import { mockEvents, mockTransactions, mockUsers } from "@/data/mock-data";
import { Transaction } from "@/types";

// Extend transactions with user and event details
const extendedTransactions = mockTransactions.map(transaction => {
  const user = mockUsers.find(u => u.id === transaction.userId);
  const event = mockEvents.find(e => e.id === transaction.eventId);
  
  return {
    ...transaction,
    userName: user?.name || "Unknown User",
    userAvatar: user?.profileImage,
    eventName: event?.name || "Unknown Event"
  };
});

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // In a real app, this would come from the authenticated user
  const currentUser = mockUsers.find(u => u.role === "organizer") || mockUsers[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isLoggedIn={true}
        userInitials={currentUser.name.split(' ').map(n => n[0]).join('')}
        userImage={currentUser.profileImage}
        userName={currentUser.name}
        userPoints={currentUser.points}
      />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-gray-50 hidden md:block">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>
            <nav className="space-y-1">
              <Button
                variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button
                variant={activeTab === "events" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("events")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                My Events
              </Button>
              <Button
                variant={activeTab === "transactions" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("transactions")}
              >
                <ListChecks className="mr-2 h-4 w-4" />
                Transactions
              </Button>
              <Button
                variant={activeTab === "attendees" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("attendees")}
              >
                <Users className="mr-2 h-4 w-4" />
                Attendees
              </Button>
              <Button
                variant={activeTab === "settings" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "events" && "My Events"}
                {activeTab === "transactions" && "Transactions"}
                {activeTab === "attendees" && "Event Attendees"}
                {activeTab === "settings" && "Account Settings"}
              </h1>
              
              {activeTab === "events" && (
                <Button onClick={() => navigate("/create-event")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              )}
            </div>
            
            {activeTab === "dashboard" && (
              <DashboardStats 
                totalEvents={mockEvents.length}
                totalAttendees={246}
                totalRevenue={12500000}
                pendingTransactions={2}
              />
            )}
            
            {activeTab === "transactions" && (
              <TransactionTable transactions={extendedTransactions} />
            )}
            
            {/* Other tabs would have their respective content here */}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
