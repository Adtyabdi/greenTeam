import React from 'react';
import Image from 'next/image';

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <Image src="/maintenance.gif" alt="Maintenance in progress" width={500} height={500} />
      <h1 className="mt-4 text-xl font-bold">Website Under Maintenance</h1>
      <p className="mt-2 text-center">
        We are currently performing maintenance. Please check back later.
      </p>
    </div>
  );
};

export default Maintenance;
