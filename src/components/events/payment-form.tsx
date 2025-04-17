
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Clock, CreditCard, Info, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputWithValidation } from "@/components/ui/input-with-validation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatIDR } from "@/components/events/event-card";

// Payment Form Schema
const paymentSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  usePoints: z.boolean().default(false),
});

type PaymentValues = z.infer<typeof paymentSchema>;

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
  availablePoints = 0,
}: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      usePoints: false,
    },
  });

  const usePoints = watch("usePoints");

  // Calculate points to use (up to the total price)
  const pointsToUse = usePoints ? Math.min(availablePoints, totalPrice) : 0;
  
  // Calculate final price after points
  const finalPrice = totalPrice - pointsToUse;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPaymentProof(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPaymentProofPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PaymentValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would submit to an API
      console.log("Payment data:", {
        ...data,
        pointsUsed: pointsToUse,
        finalPrice,
        paymentProof,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to success page or show success message
      console.log("Payment successful");
    } catch (error) {
      console.error("Error submitting payment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Complete your payment within 2 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Clock className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Time remaining:</span>
              <span className="font-semibold text-purple-600">
                {`${timeLeft.hours.toString().padStart(2, "0")}:${timeLeft.minutes
                  .toString()
                  .padStart(2, "0")}:${timeLeft.seconds.toString().padStart(2, "0")}`}
              </span>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Event</span>
              <span className="font-medium">{eventName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Date</span>
              <span>{eventDate.toLocaleDateString("id-ID")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Quantity</span>
              <span>{quantity} tickets</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Price</span>
              <span className="font-semibold">{formatIDR(totalPrice)}</span>
            </div>
            
            {availablePoints > 0 && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox
                    id="usePoints"
                    checked={usePoints}
                    onCheckedChange={(checked) => setValue("usePoints", checked === true)}
                  />
                  <Label htmlFor="usePoints" className="text-sm cursor-pointer">
                    Use my points ({formatIDR(availablePoints)} available)
                  </Label>
                </div>
                
                {usePoints && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Points used</span>
                    <span>- {formatIDR(pointsToUse)}</span>
                  </div>
                )}
                
                {usePoints && (
                  <div className="flex justify-between items-center font-bold">
                    <span>Final Price</span>
                    <span>{formatIDR(finalPrice)}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Enter your details for the transaction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputWithValidation
              id="name"
              label="Full Name"
              placeholder="Enter your full name"
              register={register}
              errors={errors}
              required
            />
            <InputWithValidation
              id="email"
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              register={register}
              errors={errors}
              required
            />
            <InputWithValidation
              id="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              register={register}
              errors={errors}
              required
            />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Payment Proof</CardTitle>
            <CardDescription>
              Upload your payment proof to confirm your transaction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-3 mb-4">
              <Info className="h-5 w-5 text-purple-600 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Payment Instructions</p>
                <p className="text-muted-foreground">
                  Transfer the amount to our bank account: BCA 1234567890 (MeetNexus) and upload the payment receipt below.
                </p>
              </div>
            </div>

            <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="file"
                id="paymentProof"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="paymentProof" className="cursor-pointer block">
                {paymentProofPreview ? (
                  <div className="relative w-full aspect-video max-w-md mx-auto overflow-hidden rounded-md">
                    <img
                      src={paymentProofPreview}
                      alt="Payment Proof Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="py-6">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to upload payment proof
                    </p>
                  </div>
                )}
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !paymentProof}>
              {isSubmitting ? "Processing..." : "Submit Payment"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
