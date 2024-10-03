// app/components/MobileView.jsx
"use client"; // Mark this component as a client component

import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MobileView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <h1>Selamat datang di Website Mobile!</h1>
        <p>Ini adalah konten yang dirender untuk pengguna mobile.</p>
      </main>
      <Footer />
    </div>
  );
};

export default MobileView;
