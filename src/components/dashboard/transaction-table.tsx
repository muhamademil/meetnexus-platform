
import { useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatIDR } from "@/components/events/event-card";
import { Transaction } from "@/types";

interface ExtendedTransaction extends Transaction {
  userName: string;
  userAvatar?: string;
  eventName: string;
}

interface TransactionTableProps {
  transactions: ExtendedTransaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<ExtendedTransaction | null>(null);
  const [proofModalOpen, setProofModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "waiting_for_payment":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Waiting for Payment</Badge>;
      case "waiting_for_confirmation":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Waiting for Confirmation</Badge>;
      case "done":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Done</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Expired</Badge>;
      case "canceled":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewProof = (transaction: ExtendedTransaction) => {
    setSelectedTransaction(transaction);
    setProofModalOpen(true);
  };

  const handleAcceptTransaction = (transactionId: string) => {
    console.log("Accept transaction:", transactionId);
    // API call would go here
    setProofModalOpen(false);
  };

  const handleRejectTransaction = (transactionId: string) => {
    console.log("Reject transaction:", transactionId);
    // API call would go here
    setProofModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Manage and review your event transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Customer</th>
                  <th className="text-left py-3 px-2 font-medium">Event</th>
                  <th className="text-left py-3 px-2 font-medium">Amount</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                  <th className="text-left py-3 px-2 font-medium">Date</th>
                  <th className="text-left py-3 px-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-slate-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={transaction.userAvatar} />
                            <AvatarFallback>
                              {transaction.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{transaction.userName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">{transaction.eventName}</td>
                      <td className="py-3 px-2">{formatIDR(transaction.totalPrice)}</td>
                      <td className="py-3 px-2">{getStatusBadge(transaction.status)}</td>
                      <td className="py-3 px-2">
                        {new Date(transaction.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-3 px-2">
                        {transaction.status === "waiting_for_confirmation" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProof(transaction)}
                          >
                            View Proof
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-muted-foreground">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={proofModalOpen} onOpenChange={setProofModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
            <DialogDescription>
              Review payment proof and approve or reject the transaction
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-md border">
                <img
                  src={selectedTransaction.paymentProof || "/placeholder.svg"}
                  alt="Payment proof"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Transaction ID:</div>
                <div>{selectedTransaction.id}</div>
                <div className="text-muted-foreground">Customer:</div>
                <div>{selectedTransaction.userName}</div>
                <div className="text-muted-foreground">Event:</div>
                <div>{selectedTransaction.eventName}</div>
                <div className="text-muted-foreground">Amount:</div>
                <div className="font-medium">{formatIDR(selectedTransaction.totalPrice)}</div>
                <div className="text-muted-foreground">Date:</div>
                <div>{new Date(selectedTransaction.createdAt).toLocaleDateString("id-ID")}</div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => handleRejectTransaction(selectedTransaction.id)}
                  className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleAcceptTransaction(selectedTransaction.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
