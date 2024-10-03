'use client';
import React, { useState, useEffect } from 'react';
import Maintenance from './components/Maintenance'; // Sesuaikan jalurnya dengan struktur folder Anda
import MobileView from './components/MobileView';


export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450 && window.innerHeight <= 935) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? <MobileView /> : <Maintenance />}
    </div>
  );
}
