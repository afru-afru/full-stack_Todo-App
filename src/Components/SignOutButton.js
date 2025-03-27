"use client";
import { signOut } from "next-auth/react";
import { useRouter,usePathname } from 'next/navigation';
import { Button } from "./ui/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const SignOutButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/auth/Signin') {
    return null;
  }

  const handleSignOut = async () => {

    await signOut({ redirect: false });
    localStorage.removeItem("auth-token");
    router.push("/auth/signin");
  };

  return (
    <Button onClick={handleSignOut} className="flex items-center justify-center space-x-2 w-full hover:text-red-500 transition-colors">
    <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5" />
    <span>Sign Out</span>
  </Button>
  );
};

export default SignOutButton;