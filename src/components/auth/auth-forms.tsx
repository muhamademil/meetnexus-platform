
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputWithValidation } from "@/components/ui/input-with-validation";

// Login schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// Registration schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters" }),
  role: z.enum(["customer", "organizer"], {
    required_error: "You need to select a user type",
  }),
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForms() {
  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState(false);
  const [isRegisterConfirmPasswordVisible, setIsRegisterConfirmPasswordVisible] = useState(false);
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
      referralCode: "",
    },
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    console.log("Login values", values);
    
    // TODO: Implement login functionality
    
    // Show notification for demo purposes
    toast.success("Login successful", {
      description: "Welcome back to MeetNexus!",
    });
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    console.log("Register values", values);
    
    // TODO: Implement registration functionality
    
    // Show notification for demo purposes
    toast.success("Registration successful", {
      description: `Welcome to MeetNexus! You've registered as a${values.role === "organizer" ? "n" : ""} ${values.role}.`,
    });
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      
      {/* Login Form */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <CardContent className="space-y-4">
              <InputWithValidation
                id="email"
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                register={loginForm.register}
                errors={loginForm.formState.errors}
                required
              />
              
              <div className="relative">
                <InputWithValidation
                  id="password"
                  label="Password"
                  type={isLoginPasswordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  register={loginForm.register}
                  errors={loginForm.formState.errors}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-8 right-2"
                  onClick={() => setIsLoginPasswordVisible(!isLoginPasswordVisible)}
                >
                  {isLoginPasswordVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      {/* Register Form */}
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
            <CardContent className="space-y-4">
              <InputWithValidation
                id="name"
                label="Full Name"
                placeholder="John Doe"
                register={registerForm.register}
                errors={registerForm.formState.errors}
                required
              />
              
              <InputWithValidation
                id="email"
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                register={registerForm.register}
                errors={registerForm.formState.errors}
                required
              />
              
              <div className="relative">
                <InputWithValidation
                  id="password"
                  label="Password"
                  type={isRegisterPasswordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  register={registerForm.register}
                  errors={registerForm.formState.errors}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-8 right-2"
                  onClick={() => setIsRegisterPasswordVisible(!isRegisterPasswordVisible)}
                >
                  {isRegisterPasswordVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="relative">
                <InputWithValidation
                  id="confirmPassword"
                  label="Confirm Password"
                  type={isRegisterConfirmPasswordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  register={registerForm.register}
                  errors={registerForm.formState.errors}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-8 right-2"
                  onClick={() => setIsRegisterConfirmPasswordVisible(!isRegisterConfirmPasswordVisible)}
                >
                  {isRegisterConfirmPasswordVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  I am registering as a: <span className="text-destructive">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="customer"
                      className="form-radio"
                      {...registerForm.register("role")}
                      defaultChecked
                    />
                    <span>Customer</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="organizer"
                      className="form-radio"
                      {...registerForm.register("role")}
                    />
                    <span>Event Organizer</span>
                  </label>
                </div>
                {registerForm.formState.errors.role && (
                  <p className="text-sm text-destructive">
                    {registerForm.formState.errors.role.message}
                  </p>
                )}
              </div>
              
              <InputWithValidation
                id="referralCode"
                label="Referral Code (Optional)"
                placeholder="Enter referral code if you have one"
                register={registerForm.register}
                errors={registerForm.formState.errors}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Register</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
