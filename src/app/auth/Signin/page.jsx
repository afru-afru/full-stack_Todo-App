"use client";
import AuthForm from "@/Components/auth/AuthForm";
import OAuthButtons from "@/components/auth/AuthButtons";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSubmit = async (formData) => {
    console.log("it is invoked")
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log(response, "response")

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('auth-token', data.token);
      console.log("Token stored. Redirecting to homepage...");
      router.push("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-2 text-gray-600">
            Choose your preferred sign in method
          </p>
        </div>

        {error && (
          <div className="p-4 text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <OAuthButtons />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <AuthForm
          type="signin"
          onSubmit={handleAuthSubmit}
        />

        <div className="text-center space-y-2">
          <a href="/auth/Signup" className="text-blue-600 hover:underline">
            Don't have an account? Sign Up
          </a>
          <br />
          <a href="/auth/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}