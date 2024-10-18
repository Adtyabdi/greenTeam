import React from 'react'
import Image from 'next/image'
import SetPoint from '../components/SetPoint'



const page = () => {
  return (
    <>
    <div className='p-4'>
        <h1 className='pb-2 text-2xl font-semibold' style={{ color: '#167D0A' }}>MicroGreens</h1>
        <div className='flex flex-col items-center pb-5'>
            <Image src="/Group 21.png" width={170} height={170}></Image>
        </div>
        <div className='flex justify-center'>
            <h1 className='text-xl font-semibold p-2 text-center w-full rounded-t-lg' style={{background: '#D8FDCB'}}>Kecambah</h1>
        </div>
        <div className='flex justify-center'>
            <div className='flex justify-between w-full p-2' style={{background: '#F0FEEB'}}>
                <div className='flex items-center'>
                        <Image src="/noto_thermometer.png" width={30} height={30}></Image>
                        <h1>50</h1>
                    </div>
                    <div className='flex items-center'>
                        <Image src="/ion_water-sharp.png" width={30} height={30}></Image>
                        <h1>50</h1>
                    </div>
                    <div className='flex items-center'>
                        <Image src="/game-icons_fertilizer-bag.png" width={30} height={30}></Image>
                        <h1>50</h1>
                    </div>
            </div>
        </div>
        <h1 className='text-lg font-semibold pt-5 pb-2'>
            Setpoint
        </h1>
        <SetPoint/>
    </div>
    </>
  )
}

export default page