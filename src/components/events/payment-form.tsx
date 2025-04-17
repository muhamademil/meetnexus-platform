
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Clock, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { formatIDR } from "./event-card";

// Payment form schema
const paymentSchema = z.object({
  usePoints: z.boolean().default(false),
  voucherCode: z.string().optional(),
  paymentProof: z.any().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  eventName: string;
  eventDate: Date;
  totalPrice: number;
  quantity: number;
  availablePoints: number;
}

export function PaymentForm({
  eventName,
  eventDate,
  totalPrice,
  quantity,
  availablePoints,
}: PaymentFormProps) {
  const [countdown, setCountdown] = useState(7200); // 2 hours in seconds
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  // Format the countdown time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Initialize form
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      usePoints: false,
      voucherCode: "",
    },
  });
  
  // Calculate points to use (all available points up to total price)
  const pointsToUse = form.watch("usePoints") ? Math.min(availablePoints, totalPrice) : 0;
  
  // Calculate final price after applying points
  const finalPrice = totalPrice - pointsToUse;
  
  const onSubmit = async (values: PaymentFormValues) => {
    console.log("Payment values", values);
    
    if (!file) {
      toast.error("Please upload payment proof");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      
      toast.success("Payment submitted successfully", {
        description: "Your payment is being processed. You'll receive a notification once it's confirmed.",
      });
      
      // In real implementation, redirect to transaction success page
    }, 2000);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Event</span>
            <span className="font-medium">{eventName}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Date</span>
            <span>{eventDate.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Quantity</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span>{formatIDR(totalPrice)}</span>
          </div>
        </div>

        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md flex items-center gap-2">
          <Clock className="h-4 w-4 text-orange-500" />
          <div className="text-sm">
            <p className="font-medium text-orange-700">Time remaining to upload payment:</p>
            <p className="text-orange-600">{formatTime(countdown)}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {availablePoints > 0 && (
              <FormField
                control={form.control}
                name="usePoints"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Use Points</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        You have {formatIDR(availablePoints)} points available
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="voucherCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voucher Code (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder="Enter voucher code" />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          if (!field.value) {
                            toast.error("Please enter a voucher code");
                            return;
                          }
                          toast.error("Invalid voucher code", {
                            description: "The voucher code you entered is invalid or has expired.",
                          });
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentProof"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Proof*</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="payment-proof"
                          onChange={(e) => {
                            handleFileChange(e);
                            field.onChange(e);
                          }}
                        />
                        <label 
                          htmlFor="payment-proof" 
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 font-medium">
                            {file ? file.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG or JPEG (max. 5MB)
                          </p>
                        </label>
                      </div>
                      {file && (
                        <div className="text-sm font-medium text-green-600 flex items-center gap-1">
                          <span>✓</span> {file.name} uploaded
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-2">
              {pointsToUse > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm">Points Used</span>
                  <span className="text-sm font-medium text-green-600">
                    - {formatIDR(pointsToUse)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>{formatIDR(finalPrice)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Submitting..." : "Submit Payment"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
