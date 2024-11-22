import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Informasi = () => {
    return (
        <>
            <div className='px-4 my-6'>
                <h1 className='text-xl font-semibold mb-3' style={{ color: '#167D0A' }}>Informasi</h1>
                <div className='flex gap-2'>
                    <div className="bg-yellow-100 border border-green-300 rounded-xl drop-shadow-xl p-4 w-72 transition transform hover:scale-105 hover:shadow-2xl">
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
                            Lingkungan
                        </h2>
                    </div>
                    <div className="bg-yellow-100 border border-green-300 rounded-xl drop-shadow-xl p-6 w-72 transition transform hover:scale-105 hover:shadow-2xl">
                        <div className="flex justify-center">
                            <Image
                                src="/battery3.gif"
                                alt="Brokoli"
                                width={110}
                                height={110}
                                className="rounded-md"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                            Battery
                        </h2>
                    </div>
                </div>
                <div className='mt-2 border-b-4 border-gray-600'></div>
            </div>
        </>
    )
}

export default Informasi