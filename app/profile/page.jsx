import React from 'react'
import SignOut from '../components/SignOut'
import Footer from '../components/Footer'
import Image from 'next/image'
import PrintButton from '../components/PrintButton'

const page = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className='flex-grow p-4'>
                    <p className='pb-2 text-2xl font-semibold' style={{ color: '#167D0A' }}>Profile</p>
                    <div
                        className="w-8/12 max-w-sm mx-auto p-4 rounded-xl shadow-lg"
                        style={{ background: '#D8FDCB' }}
                    >
                        <div className="flex justify-center pb-4">
                            <Image
                                src="/profile.svg"
                                width={150}
                                height={150}
                                className="rounded-lg"
                                alt="profile"
                            />
                        </div>
                        <p className="text-center font-semibold text-lg">Fufufafa</p>
                    </div>
                    <div className='pt-5'>
                        <SignOut />
                    </div>
                    <div className='pt-5'>
                        <PrintButton />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default page