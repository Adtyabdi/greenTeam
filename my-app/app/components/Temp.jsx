import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';

const Temp = () => {
  return (
    <>
    <Link href="../temperature">
        <div className="w-full flex justify-center items-center">
            <div className="bg-amber-500 p-4 w-11/12 flex justify-between rounded-lg">
                <h1 className="text-xl">Temperature</h1>
                <FaArrowRight className="mt-1" size={20} />
            </div>
        </div>
    </Link>
    </>
  )
}

export default Temp