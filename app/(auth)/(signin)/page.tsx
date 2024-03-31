"use client";
import { useState, useEffect } from "react";
import UserSignInForm from "@/components/forms/user-signin-form";
import UserSignUpForm from "@/components/forms/user-signup-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function AuthenticationPage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const { data: session } = useSession();
  const handleSignUp = () => {
    setIsSignIn(true);
  };
  useEffect(()=> {
    if(session?.user){
      router.push('/dashboard');
    }
  }, [session?.user])
  
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </h1>
          </div>
          {isSignIn ? <UserSignInForm /> : <UserSignUpForm onSignUp={handleSignUp} />}
          <p>
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? 'Sign Up' : 'Sign In'}</button>
          </p>
        </div>
      </div>
    </div>
  );
}

