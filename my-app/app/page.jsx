// import React from 'react';
// import MobileView from './components/MobileView';

// const Page = () => {
//   return (
//     <MobileView />
//   );
// }

// export default Page;

import React from 'react'
import Link from 'next/link'


const page = () => {
  return (
    <>
    <div>
     <Link href="./api/auth/signin">Sign in</Link>
     </div>
    </>
    
  )
}

export default page
