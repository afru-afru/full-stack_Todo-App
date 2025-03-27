"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      // Handle empty responses
      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(data.error || `Signup failed (Status: ${response.status})`);
      }

      // Redirect with success state
      alert('registered successfully')
      router.push("/");
    } catch (err) {
      console.error("Registration Failed:", {
        error: err.message,
        timestamp: new Date().toISOString(),
        formData
      });
      setError(err.message || "Something went wrong during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Start organizing your tasks</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">Registration Error:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/Signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}