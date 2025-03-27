
"use client";
import { signIn } from "next-auth/react";
import {Button} from "../ui/Button";

export default function OAuthButtons() {
  const handleOAuthSignIn = (provider) => () => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="grid grid-cols-2 gap-4 ">
      <Button
        onClick={handleOAuthSignIn("google")}
        className="bg-red-600 hover:bg-red-700"
      >
        Google
      </Button>
      <Button
        onClick={handleOAuthSignIn("github")}
        className="bg-gray-300 hover:bg-gray-400 "
      >
        GitHub
      </Button>
    </div>
  );
}

