'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '../components/Footer';

const Page = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/getBrok');

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      setError('Failed to connect to the server. Please try again later.');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <div className='p-4'>
        <h1 className='pb-2 text-2xl font-semibold' style={{ color: '#167D0A' }}>MicroGreens</h1>
        <div className='flex flex-col items-center pb-5'>
          <Image src="/Group 21.png" width={170} height={170} alt="Logo"></Image>
        </div>
        <div className='flex justify-center'>
          <h1 className='text-xl font-semibold p-2 text-center w-full rounded-t-lg' style={{ background: '#D8FDCB' }}>Brokoli</h1>
        </div>
        <div className='flex justify-center'>
          <div className='flex justify-between w-full p-2' style={{ background: '#F0FEEB' }}>
            <div className='flex items-center'>
              <Image src="/noto_thermometer.png" width={30} height={30} alt="Temperature Icon"></Image>
              <h1>{data ? data.dht1_temp : 'Loading...'} °C</h1>
            </div>
            <div className='flex items-center'>
              <Image src="/ion_water-sharp.png" width={30} height={30} alt="Humidity Icon"></Image>
              <h1>{data ? data.dht1_humi : 'Loading...'} %</h1>
            </div>
            <div className='flex items-center'>
              <Image src="/game-icons_fertilizer-bag.png" width={30} height={30} alt="Moisture Icon"></Image>
              <h1>{data ? data.moisture1 : 'Loading...'} %</h1>
            </div>
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </div>
      <Footer />
    </>
  );
};

export default Page;
