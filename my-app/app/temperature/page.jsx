'use client'; 

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import React from 'react'
import Header from '../components/Header'

const Temperature = () => {
  const { data: session, status } = useSession(); 
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <>
    <Header/>
    <div className="text-white text-center">Sabar Bang Setting DB dulu ya😎😎😎😎</div>
    </>
  )
}

export default Temperature