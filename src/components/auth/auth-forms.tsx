
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputWithValidation } from "@/components/ui/input-with-validation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Login schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type LoginValues = z.infer<typeof loginSchema>;

// Registration schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["customer", "organizer"]),
  referralCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export function AuthForms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("login");

  // Login form
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterValues>({
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

  const onLoginSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    try {
      // Login implementation would go here
      console.log('Login data:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    try {
      // Registration implementation would go here
      console.log('Register data:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-lg">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      
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
              <InputWithValidation
                id="password"
                label="Password"
                type="password"
                placeholder="********"
                register={loginForm.register}
                errors={loginForm.formState.errors}
                required
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>

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
              <InputWithValidation
                id="password"
                label="Password"
                type="password"
                placeholder="********"
                register={registerForm.register}
                errors={registerForm.formState.errors}
                required
              />
              <InputWithValidation
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="********"
                register={registerForm.register}
                errors={registerForm.formState.errors}
                required
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">I want to register as</label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={registerForm.watch("role") === "customer" ? "default" : "outline"}
                    onClick={() => registerForm.setValue("role", "customer")}
                    className="w-full"
                  >
                    Customer
                  </Button>
                  <Button
                    type="button"
                    variant={registerForm.watch("role") === "organizer" ? "default" : "outline"}
                    onClick={() => registerForm.setValue("role", "organizer")}
                    className="w-full"
                  >
                    Event Organizer
                  </Button>
                </div>
              </div>
              <InputWithValidation
                id="referralCode"
                label="Referral Code (Optional)"
                placeholder="Enter referral code"
                register={registerForm.register}
                errors={registerForm.formState.errors}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
