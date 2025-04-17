
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatIDR } from "@/components/events/event-card";
import { Transaction } from "@/types";
import { toast } from "sonner";
import { Check, Eye, X } from "lucide-react";

// Extended transaction with user details
interface ExtendedTransaction extends Transaction {
  userName: string;
  userAvatar?: string;
  eventName: string;
}

interface TransactionTableProps {
  transactions: ExtendedTransaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "waiting_for_payment":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Awaiting Payment</Badge>;
      case "waiting_for_confirmation":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Awaiting Confirmation</Badge>;
      case "done":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Expired</Badge>;
      case "canceled":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Canceled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleAcceptTransaction = (transactionId: string) => {
    // In a real app, this would call an API
    console.log("Accept transaction", transactionId);
    toast.success("Transaction accepted", {
      description: "The customer has been notified about their approved transaction."
    });
  };

  const handleRejectTransaction = (transactionId: string) => {
    // In a real app, this would call an API
    console.log("Reject transaction", transactionId);
    toast.success("Transaction rejected", {
      description: "The customer has been notified and their points/vouchers have been refunded."
    });
  };

  const handleViewProof = (transaction: ExtendedTransaction) => {
    // In a real app, this would show a modal with the payment proof
    console.log("View payment proof", transaction.id);
    toast.info("View Payment Proof", {
      description: `Viewing payment proof for transaction ${transaction.id}`,
    });
  };
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium">
                        {transaction.userAvatar ? (
                          <img 
                            src={transaction.userAvatar} 
                            alt={transaction.userName} 
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          transaction.userName.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="font-medium">{transaction.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.eventName}</TableCell>
                  <TableCell>{formatIDR(transaction.totalPrice)}</TableCell>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {transaction.status === "waiting_for_confirmation" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600"
                            onClick={() => handleAcceptTransaction(transaction.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => handleRejectTransaction(transaction.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {(transaction.status === "waiting_for_confirmation" || 
                         transaction.status === "done") && 
                         transaction.paymentProof && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleViewProof(transaction)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
