"use client";

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    router.push('/');
  };

  return (
    <>
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </>
  );
};

export default SignOut;
