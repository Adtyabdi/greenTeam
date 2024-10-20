'use client'; 

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Header from './Header';
import Informasi from './Informasi';
import RiwayatBrokoli from './RiwayatBrokoli';
import RiwayatKecambah from './RiwayatKecambah';
import SignOut from './SignOut';
import Footer from './Footer';

const MobileView = () => {
  const { data: session, status } = useSession(); 
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Informasi/>
      <RiwayatBrokoli/>
      <RiwayatKecambah/>
      <Footer/>
      {/* <SignOut /> */}
    </div>
  );
};

export default MobileView;
