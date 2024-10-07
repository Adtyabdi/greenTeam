import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <>    
      <div className="bg-blue-500 w-full h-44 p-4">
        <div className="flex justify-between items-center pt-3">
        <Link href ="/dashboard">
          <div className="text-3xl font-semibold">
            <h1>Microgreen</h1>
            <h1>Team</h1>
          </div>
        </Link>
          <Image src="/logo.png" width={70} height={70} alt="logo"/>
        </div>
        <div className="flex justify-between items-center gap-2 pt-4">
          <div className="bg-amber-500 p-2 w-1/4 rounded-lg">
            <h1 className="text-center">26°C</h1>
          </div>
          <div className="bg-amber-500 p-2 w-1/4 rounded-lg">
            <h1 className="text-center">51% Rh</h1>
          </div>
          <div className="bg-amber-500 p-2 w-1/4 rounded-lg">
            <h1 className="text-center">100 Lux</h1>
          </div>
          <div className="bg-amber-500 p-2 w-1/4 rounded-lg">
            <h1 className="text-center">68 %</h1>
          </div>
        </div>
      </div>    
    </>
  )
}

export default Header