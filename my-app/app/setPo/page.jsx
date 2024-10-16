'use client'; 

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import React from 'react'
import Header from '../components/Header'
import EnterCancel from '../components/EnterCancel'

const setPo = () => {
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
    {/* <Header/> */}
    <div className="bg-white m-5 rounded-lg">
      <div className="pt-4">
        <h1 className="text-center text-2xl text-black font-bold">Temperature</h1>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-semibold text-base">Maximal Value</label>
          <input 
            type="number" 
            className="bg-slate-200 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-semibold text-base">Manimal Value</label>
          <input 
            type="number" 
            className="bg-slate-200 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
      </div>
      <div>
      <h1 className="text-center text-2xl text-black font-bold">Humidity</h1>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-semibold text-base">Maximal Value</label>
          <input 
            type="number" 
            className="bg-slate-300 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-semibold text-base">Manimal Value</label>
          <input 
            type="number" 
            className="bg-slate-300 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
      </div>
      <EnterCancel/>
    </div>

    </>
  )
}

export default setPo