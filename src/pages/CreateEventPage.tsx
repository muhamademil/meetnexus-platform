
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Clock, Info, Plus, Upload } from "lucide-react";
import { format } from "date-fns";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { InputWithValidation } from "@/components/ui/input-with-validation";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventCategories, locations } from "@/data/mock-data";

// Create Event Form Schema
const createEventSchema = z.object({
  name: z.string().min(5, { message: "Event name must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  location: z.string().min(1, { message: "Please select a location" }),
  startDate: z.date({ required_error: "Please select a start date" }),
  endDate: z.date({ required_error: "Please select an end date" }),
  isFree: z.boolean().default(false),
  price: z.preprocess(
    (value) => (value === "" ? 0 : Number(value)),
    z.number().min(0, { message: "Price must be at least 0" })
  ),
  availableSeats: z.preprocess(
    (value) => (value === "" ? 0 : Number(value)),
    z.number().min(1, { message: "Available seats must be at least 1" })
  ),
}).refine((data) => (data.isFree ? true : data.price > 0), {
  message: "Price must be greater than 0 for paid events",
  path: ['price'],
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ['endDate'],
});

type CreateEventValues = z.infer<typeof createEventSchema>;

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      location: "",
      isFree: false,
      price: 0,
      availableSeats: 10,
    },
  });

  const isFree = watch("isFree");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CreateEventValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would submit to an API
      console.log("Event data:", data);
      console.log("Image file:", selectedFile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to events page on success
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-purple-50 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-lg text-muted-foreground">
            Fill out the details below to create your event
          </p>
        </div>
      </div>
      
      <div className="container py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details & Pricing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Information</CardTitle>
                  <CardDescription>
                    Enter the basic information about your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Event Name */}
                  <InputWithValidation
                    id="name"
                    label="Event Name"
                    placeholder="Enter event name"
                    register={register}
                    errors={errors}
                    required
                  />
                  
                  {/* Event Description */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="description" className="text-sm font-medium leading-none">
                        Description <span className="text-destructive">*</span>
                      </label>
                      {errors.description && (
                        <p className="text-sm text-destructive">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Describe your event"
                      className={errors.description ? "border-destructive" : ""}
                      {...register("description")}
                    />
                  </div>
                  
                  {/* Category & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Category <span className="text-destructive">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => setValue("category", value)}
                        defaultValue=""
                      >
                        <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventCategories.filter(cat => cat !== "All").map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Location <span className="text-destructive">*</span>
                      </label>
                      <Select
                        onValueChange={(value) => setValue("location", value)}
                        defaultValue=""
                      >
                        <SelectTrigger className={errors.location ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.filter(loc => loc !== "All").map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.location && (
                        <p className="text-sm text-destructive">
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Event Image */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Image</label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="file"
                        id="image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="image" className="cursor-pointer block">
                        {imagePreview ? (
                          <div className="relative w-full aspect-video mx-auto overflow-hidden rounded-md">
                            <img
                              src={imagePreview}
                              alt="Event Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="py-6">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload an image (recommended size: 1280x720)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>
                    Set the date, time, and other details for your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Start Date & Time <span className="text-destructive">*</span>
                      </label>
                      <div className={errors.startDate ? "border rounded-md border-destructive" : ""}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? (
                                format(startDate, "PPP p")
                              ) : (
                                <span>Select date and time</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={(date) => date && setValue("startDate", date)}
                              initialFocus
                            />
                            <div className="border-t p-3">
                              <div className="grid grid-cols-3 gap-2">
                                <Select
                                  onValueChange={(value) => {
                                    if (startDate) {
                                      const newDate = new Date(startDate);
                                      newDate.setHours(parseInt(value));
                                      setValue("startDate", newDate);
                                    }
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Hour" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <SelectItem key={i} value={i.toString()}>
                                        {i.toString().padStart(2, "0")}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Select
                                  onValueChange={(value) => {
                                    if (startDate) {
                                      const newDate = new Date(startDate);
                                      newDate.setMinutes(parseInt(value));
                                      setValue("startDate", newDate);
                                    }
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Min" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {["00", "15", "30", "45"].map((minute) => (
                                      <SelectItem key={minute} value={minute}>
                                        {minute}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    if (startDate) {
                                      const now = new Date();
                                      const newDate = new Date(startDate);
                                      newDate.setHours(now.getHours(), now.getMinutes());
                                      setValue("startDate", newDate);
                                    }
                                  }}
                                >
                                  <Clock className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {errors.startDate && (
                        <p className="text-sm text-destructive">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        End Date & Time <span className="text-destructive">*</span>
                      </label>
                      <div className={errors.endDate ? "border rounded-md border-destructive" : ""}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? (
                                format(endDate, "PPP p")
                              ) : (
                                <span>Select date and time</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={(date) => date && setValue("endDate", date)}
                              initialFocus
                              disabled={(date) => startDate ? date < startDate : false}
                            />
                            <div className="border-t p-3">
                              <div className="grid grid-cols-3 gap-2">
                                <Select
                                  onValueChange={(value) => {
                                    if (endDate) {
                                      const newDate = new Date(endDate);
                                      newDate.setHours(parseInt(value));
                                      setValue("endDate", newDate);
                                    }
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Hour" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 24 }).map((_, i) => (
                                      <SelectItem key={i} value={i.toString()}>
                                        {i.toString().padStart(2, "0")}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Select
                                  onValueChange={(value) => {
                                    if (endDate) {
                                      const newDate = new Date(endDate);
                                      newDate.setMinutes(parseInt(value));
                                      setValue("endDate", newDate);
                                    }
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Min" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {["00", "15", "30", "45"].map((minute) => (
                                      <SelectItem key={minute} value={minute}>
                                        {minute}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    if (startDate) {
                                      const newDate = new Date(startDate);
                                      newDate.setHours(newDate.getHours() + 2);
                                      setValue("endDate", newDate);
                                    }
                                  }}
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  2h
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {errors.endDate && (
                        <p className="text-sm text-destructive">
                          {errors.endDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Pricing</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="isFree">Free Event</Label>
                        <p className="text-sm text-muted-foreground">
                          Toggle if this is a free event
                        </p>
                      </div>
                      <Switch
                        id="isFree"
                        checked={isFree}
                        onCheckedChange={(checked) => setValue("isFree", checked)}
                      />
                    </div>
                    
                    {!isFree && (
                      <InputWithValidation
                        id="price"
                        label="Price (IDR)"
                        type="number"
                        placeholder="Enter price in IDR"
                        register={register}
                        errors={errors}
                        required={!isFree}
                      />
                    )}
                  </div>
                  
                  {/* Available Seats */}
                  <InputWithValidation
                    id="availableSeats"
                    label="Available Seats"
                    type="number"
                    placeholder="Enter number of available seats"
                    register={register}
                    errors={errors}
                    required
                  />
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreateEventPage;
