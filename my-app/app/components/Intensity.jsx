import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const Intensity = () => {
  return (
    <>
    <div className="w-full flex justify-center items-center">
        <div className="bg-amber-500 p-4 w-11/12 flex justify-between rounded-lg">
            <h1 className="text-xl">Intensity</h1>
            <FaArrowRight className="mt-1" size={20} />
        </div>
    </div>
    </>
  )
}

export default Intensity