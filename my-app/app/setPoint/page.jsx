'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import Link from 'next/link';

const SetPoint = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State untuk menyimpan nilai input
  const [tempMax, setTempMax] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [humiMax, setHumiMax] = useState('');
  const [humiMin, setHumiMin] = useState('');

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
        Swal.fire('Cancelled!', 'Your action has been cancelled.', 'success');
      }
    });
  };

  const handleEnter = async () => {
    try {
      const response = await fetch('/api/setPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempMax: Number(tempMax),
          tempMin: Number(tempMin),
          humiMax: Number(humiMax),
          humiMin: Number(humiMin),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire('Success!', result.message, 'success');
      } else {
        Swal.fire('Error!', result.error, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong!', 'error');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-4">
        <Link href="/dashboard">
          <div className="text-2xl font-semibold" style={{ color: '#167D0A' }}>
            <h1 className="pb-2">MicroGreens</h1>
          </div>
        </Link>

        <div className="bg-white rounded-lg">
          <div className="pt-4">
            <h1 className="text-center text-lg text-black font-semibold">Temperature</h1>
            <div className="flex flex-col px-4">
              <label className="text-black font-medium text-base">Maximal Value</label>
              <input
                type="number"
                className="bg-slate-200 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2"
                placeholder="Input Here"
                value={tempMax}
                onChange={(e) => setTempMax(e.target.value)}
              />

              <label className="text-black font-medium text-base">Minimal Value</label>
              <input
                type="number"
                className="bg-slate-200 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2"
                placeholder="Input Here"
                value={tempMin}
                onChange={(e) => setTempMin(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h1 className="text-center text-lg text-black font-semibold">Humidity</h1>
            <div className="flex flex-col px-4">
              <label className="text-black font-medium text-base">Maximal Value</label>
              <input
                type="number"
                className="bg-slate-300 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2"
                placeholder="Input Here"
                value={humiMax}
                onChange={(e) => setHumiMax(e.target.value)}
              />

              <label className="text-black font-medium text-base">Minimal Value</label>
              <input
                type="number"
                className="bg-slate-300 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2"
                placeholder="Input Here"
                value={humiMin}
                onChange={(e) => setHumiMin(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 py-7">
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 w-1/5 p-2 rounded-lg text-center font-semibold"
            >
              <h1>Cancel</h1>
            </button>

            <button
              onClick={handleEnter}
              className="bg-green-500 hover:bg-green-600 w-1/5 p-2 rounded-lg text-center font-semibold"
            >
              <h1>Enter</h1>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default SetPoint;
