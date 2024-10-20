import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <div className='px-4'>
        <div className='flex gap-16 bg-slate-200 p-2 justify-center rounded-xl'>
          <Link href='../dashboard'>
            <IoHomeOutline size={30} />
          </Link>
          <Link href='../profile'>
            <CgProfile size={30} />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Footer