import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BatteryDisplay from './BatteryDisplay'

const Informasi = () => {
    return (
        <>
            <div className='px-4 my-6'>
                <div className='flex justify-between'>
                    <h1 className='text-xl font-semibold mb-3' style={{ color: '#167D0A' }}>Informasi</h1>
                    <BatteryDisplay />
                </div>
                <div className='flex gap-2'>
                    <div className="bg-yellow-100 border border-green-300 rounded-xl drop-shadow-xl p-4 w-72 transition transform hover:scale-105 hover:shadow-2xl">
                        <Link href='../lingkungan'>
                            <div className="flex justify-center">
                                <Image
                                    src="/kecambah.svg"
                                    alt="Brokoli"
                                    width={110}
                                    height={110}
                                    className="rounded-md"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                                Incubator
                            </h2>
                        </Link>
                    </div>
                    <div className="bg-yellow-100 border border-green-300 rounded-xl drop-shadow-xl p-6 w-72 transition transform hover:scale-105 hover:shadow-2xl">
                        <Link href='../plts'>
                            <div className="flex justify-center">
                                <Image
                                    src="/plts.svg"
                                    alt="Brokoli"
                                    width={110}
                                    height={110}
                                    className="rounded-md"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-10 text-center">
                                PLTS
                            </h2>
                        </Link>
                    </div>
                </div>
                <div className='mt-2 border-b-4 border-gray-600'></div>
            </div>
        </>
    )
}

export default Informasi