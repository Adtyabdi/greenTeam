"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Footer from '../components/Footer'

const Page = () => {

    const [data, setData] = useState({ infoKecambah: null, tabelKecambah: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource('/api/get');

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
    }, [error]);
    const { infoKecambah, tabelKecambah } = data;
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className='p-4'>
                    <h1 className='pb-2 text-2xl font-semibold' style={{ color: '#167D0A' }}>MicroGreens</h1>
                    <div className='flex flex-col items-center pb-5'>
                        <Image src="/brokoli.svg" width={170} height={170} alt="Logo"></Image>
                    </div>
                    <div className='flex justify-center'>
                        <h1 className='text-xl font-semibold p-2 text-center w-full rounded-t-lg' style={{ background: '#D8FDCB' }}>Kecambah</h1>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex justify-between w-full p-2' style={{ background: '#F0FEEB' }}>
                            <div className='flex items-center'>
                                <Image src="/noto_thermometer.png" width={30} height={30} alt="Temperature Icon"></Image>
                                <h1>{infoKecambah ? `${infoKecambah.dht2_temp}` : 'Loading...'} °C</h1>
                            </div>
                            <div className='flex items-center'>
                                <Image src="/ion_water-sharp.png" width={30} height={30} alt="Humidity Icon"></Image>
                                <h1>{infoKecambah ? `${infoKecambah.dht2_humi}` : 'Loading...'} %</h1>
                            </div>
                            <div className='flex items-center'>
                                <Image src="/game-icons_fertilizer-bag.png" width={30} height={30} alt="Moisture Icon"></Image>
                                <h1>{infoKecambah ? `${infoKecambah.moisture2}` : 'Loading...'} %</h1>
                            </div>
                        </div>
                    </div>
                    {error && <div className="text-red-600">{error}</div>}
                </div>
                <div className='p-4 flex-grow'>
                    <table className="border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300  text-center">Date</th>
                                <th className="border border-gray-300  text-center">Temp</th>
                                <th className="border border-gray-300  text-center">Humidity</th>
                                <th className="border border-gray-300  text-center">Moisture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabelKecambah && tabelKecambah.length > 0 ? (
                                tabelKecambah.map((row, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                                        <td className="border border-gray-300  text-center">
                                            {row.formatted_date}
                                        </td>
                                        <td className="border border-gray-300  text-center">
                                            {row.dht2_temp}
                                        </td>
                                        <td className="border border-gray-300  text-center">
                                            {row.dht2_humi}
                                        </td>
                                        <td className="border border-gray-300  text-center">
                                            {row.moisture2}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Page