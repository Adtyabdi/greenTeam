"use client";

import React from 'react';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const page = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow p-4">
                <h1 className="pb-2 text-2xl font-semibold" style={{ color: '#167D0A' }}>MicroGreens</h1>
                <div className="flex gap-2">
                    <div className="bg-yellow-100 border border-green-300 rounded-xl drop-shadow-xl p-4 w-72 transition transform hover:scale-105 hover:shadow-2xl">
                        <Link href="../plts/panel">
                            <div className="flex justify-center">
                                <Image
                                    src="/panel.svg"
                                    alt="Brokoli"
                                    width={110}
                                    height={110}
                                    className="rounded-md"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                                panel
                            </h2>
                        </Link>
                    </div>
                    <div className="bg-yellow-100 border border-green-300 rounded-xl drop-shadow-xl p-6 w-72 transition transform hover:scale-105 hover:shadow-2xl">
                        <Link href="../plts/battery">
                            <div className="flex justify-center">
                                <Image
                                    src="/battery3.gif"
                                    alt="Brokoli"
                                    width={110}
                                    height={110}
                                    className="rounded-md"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-10 text-center">
                                Battery
                            </h2>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default page;
