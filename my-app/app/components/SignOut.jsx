'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const SignOut = () => {

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Setelah sign out, redirect ke halaman login
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default SignOut;
