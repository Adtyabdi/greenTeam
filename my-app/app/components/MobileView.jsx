import React from 'react';
import Header from './Header';
import SetPoint from './SetPoint';
import Temp from './Temp';
import Humidity from './Humidity';
import Intensity from './Intensity';
import Battery from './Battery';

const MobileView = () => {
  return (
    <>
      <Header/>
      <SetPoint/>
      <Temp/>
      <Humidity/>
      <Intensity/>
      <Battery/>
      <div className="flex flex-col items-center justify-center">
        <main className="text-center">
          <h1>Selamat datang di Website Mobile!</h1>
          <p>Ini adalah konten yang dirender untuk pengguna mobile.</p>
        </main>
      </div>
    </>
  );
};

export default MobileView;
