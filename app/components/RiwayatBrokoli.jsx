"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const RiwayatBrokoli = () => {

    const [data, setData] = useState({ infoBrokoli: null, tabelBrokoli: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource('/api/get');

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setData(parsedData);
        };

        eventSource.onerror = (event) => {
            console.error('EventSource failed: ', error);
            setError('Failed to connect to the server. Please try again leter.');
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [error]);
    const { infoBrokoli, tabelBrokoli } = data;

    return (
        <>
            <div className='px-4'>
                <h1 className='text-xl font-semibold mb-3' style={{ color: '#167D0A' }}>Riwayat</h1>
                <Link href='../infoBrokoli'>
                    <div className="flex items-center p-4 bg-white rounded-xl shadow-md space-x-4 transition transform hover:scale-105 hover:shadow-2xl">
                        <div className="bg-yellow-100 p-2 rounded-lg shadow">
                            <Image
                                src="/kecambah.svg"
                                alt="Arugula Mustard"
                                width={150}
                                height={150}
                                className="rounded-md"
                            />
                        </div>
                        <div className='w-full'>
                            <h1 className='text-lg font-semibold border-b-2'>Brokoli</h1>

                            <div className='my-2'>
                                <div className='flex items-center'>
                                    <Image src="/noto_thermometer.png" width={28} height={28} alt='temp' />
                                    <p>{infoBrokoli ? `${infoBrokoli.dht1_temp}` : 'Loading'} °C</p>
                                </div>
                                <div className='flex my-2 items-center'>
                                    <Image src="/ion_water-sharp.png" width={28} height={28} alt='water' />
                                    <p>{infoBrokoli ? `${infoBrokoli.dht1_humi}` : 'Loading'} %</p>
                                </div>
                                <div className='flex items-center'>
                                    <Image src="/game-icons_fertilizer-bag.png" width={28} height={28} alt='moisture' />
                                    <p>{infoBrokoli ? `${infoBrokoli.moisture1}` : 'Loading'} %</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default RiwayatBrokoli