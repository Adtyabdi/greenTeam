import React from 'react'
import Link from 'next/link'


const page = () => {
  return (
    <>
      <div className="flex items-center w-full h-screen justify-center">
        <div className="text-center">
          <h1 className="pb-6 ">Tinggal klik aja ngga usah cari yang ngga ada</h1>
          <Link href="./api/auth/signin" className="p-2 bg-sky-600 hover:bg-sky-400 rounded-lg">Sign in</Link>
          {/* <Link href="./dashboard" className="p-2 bg-sky-600 hover:bg-sky-400 rounded-lg">Sign in</Link> */}
        </div>
      </div>
    </>

  )
}

export default page
