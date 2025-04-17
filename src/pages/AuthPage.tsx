
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthForms } from "@/components/auth/auth-forms";

const AuthPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <AuthForms />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
