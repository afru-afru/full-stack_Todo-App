"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useRouter } from 'next/navigation';

export default function AuthForm({ type = "signin" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only used for signup
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Handle sign-up
      if (type === "signup") {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        if (!res.ok) throw new Error(await res.text());
      }

      // Handle sign-in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) throw new Error(result.error);

      // Redirect after a successful sign-in
      router.push("/"); // Redirect to homepage or desired page
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {type === "signup" && (
        <Input
          label="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <Input
        label="Email"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        required
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : type === "signin" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
}