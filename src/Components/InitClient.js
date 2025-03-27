// src/Components/InitClient.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InitDb from './init-db';

const InitClient = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.push('/auth/Signin'); // Redirect to sign-in if not authenticated
    } else {
      InitDb();
      router.push('/')

    }
  }, [router]);

  return null; // This component does not need to render anything
};

export default InitClient;