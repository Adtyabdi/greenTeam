'use client';

import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const Page = () => {
    const [showNewTable, setShowNewTable] = useState(false);

    return (
        <>
            <div className="px-4 my-6">
                <h1 className="text-xl font-semibold mb-3" style={{ color: '#167D0A' }}>Lingkungan</h1>
                <div>
                    <table className="w-full">
                        <thead className="items-center">
                            <tr>
                                <th className="font-bold bg-gray-50 p-1 rounded-sm text-center border-b-4">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center bg-gray-50 h-12 flex justify-between items-center border-b-2">
                                    <h1 className="ml-10">
                                        1234
                                    </h1>
                                    <button
                                        className="mr-10"
                                        onClick={() => setShowNewTable(!showNewTable)}
                                        aria-label="Toggle table"
                                    >
                                        {showNewTable ? (
                                            <IoIosArrowDropup size={20} />
                                        ) : (
                                            <IoIosArrowDropdown size={20} />
                                        )}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {showNewTable && (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className='font-normal bg-slate-200'>Temp</th>
                                    <th className='font-normal bg-slate-200'>Humi</th>
                                    <th className='font-normal bg-slate-200'>
                                        Moisture
                                    </th>
                                    <th className='font-normal bg-slate-200'>Light</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='text-center text-sm'>25°C</td>
                                    <td className='text-center text-sm'>60%</td>
                                    <td className='text-center text-sm'>45%</td>
                                    <td className='text-center text-sm'>800 Lux</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};



export default Page;


