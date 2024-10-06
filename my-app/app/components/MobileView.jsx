'use client'; 

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Header from './Header';
import SetPoint from './SetPoint';
import Temp from './Temp';
import Humidity from './Humidity';
import Intensity from './Intensity';
import Battery from './Battery';
import SignOutButton from './SignOut';
import SignOut from './SignOut';

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
      <SetPoint />
      <Temp />
      <Humidity />
      <Intensity />
      <Battery />
      <SignOut />
    </div>
  );
};

export default MobileView;
