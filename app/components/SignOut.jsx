"use client";

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosLogOut } from "react-icons/io";

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    router.push('/');
  };

  return (
    <>
      <div className='flex items-center justify-between bg-gray-200 hover:bg-gray-400 p-2 rounded-lg'>
        <button onClick={handleSignOut} className='font-medium text-lg'>Sign Out</button>
        <IoIosLogOut size={25}/>
      </div>
    </>
  );
};

export default SignOut;
