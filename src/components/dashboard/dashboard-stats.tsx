
import { BarChart, Calendar, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatIDR } from "@/components/events/event-card";

interface DashboardStatsProps {
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  pendingTransactions: number;
}

export function DashboardStats({
  totalEvents,
  totalAttendees,
  totalRevenue,
  pendingTransactions,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEvents}</div>
          <p className="text-xs text-muted-foreground">
            {totalEvents > 0 ? "+1 from last month" : "No events yet"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAttendees}</div>
          <p className="text-xs text-muted-foreground">
            {totalAttendees > 0 ? "+12 from last week" : "No attendees yet"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatIDR(totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            {totalRevenue > 0 ? "+2.1% from last month" : "No revenue yet"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingTransactions}</div>
          <p className="text-xs text-muted-foreground">
            {pendingTransactions > 0 
              ? `${pendingTransactions} transaction${pendingTransactions > 1 ? 's' : ''} awaiting confirmation` 
              : "No pending transactions"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
