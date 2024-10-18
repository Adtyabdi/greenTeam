'use client'; 

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import React from 'react'
import Swal from 'sweetalert2';

const SetPoint = () => {
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

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cancelled!',
          'Your action has been cancelled.',
          'success'
        );
      }
    });
  };

  const handleEnter = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Your action has been successfully submitted!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };


  return (
    <>
    <div className="bg-white rounded-lg">
      <div className="pt-4">
        <h1 className="text-center text-lg text-black font-semibold">Temperature</h1>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-medium text-base">Maximal Value</label>
          <input 
            type="number" 
            className="bg-slate-200 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-medium text-base">Manimal Value</label>
          <input 
            type="number" 
            className="bg-slate-200 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
      </div>
      <div>
        <h1 className="text-center text-lg text-black font-semibold">Humidity</h1>
        <form action="" className="flex flex-col px-4">
        <label htmlFor="" className="text-black font-medium text-base">Maximal Value</label>
        <input 
            type="number" 
            className="bg-slate-300 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"/>
        </form>
        <form action="" className="flex flex-col px-4">
        <label htmlFor="" className="text-black font-medium text-base">Manimal Value</label>
        <input 
            type="number" 
            className="bg-slate-300 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"/>
        </form>
      </div>

      <div className="flex items-center justify-center gap-4 py-7">
         <button 
            onClick={handleCancel} 
            className="bg-red-500 hover:bg-red-600 w-1/5 p-2 rounded-lg text-center font-semibold">
            <h1>Cancel</h1>
        </button>
        <button 
            onClick={handleEnter} 
            className="bg-green-500 hover:bg-green-600 w-1/5 p-2 rounded-lg text-center font-semibold">
            <h1>Enter</h1>
        </button>
      </div>
    </div>

    </>
  )
}

export default SetPoint