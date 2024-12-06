"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Maintenance from "./components/Maintenance";
import "./globals.css";

export default function RootLayout({ children }) {
  const [isMobileView, setIsMobileView] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobileView(width <= 450 && height <= 935);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SessionProvider>
      <html lang='en'>
        <body>{isMobileView ? children : <Maintenance />}</body>
      </html>
    </SessionProvider>
  );
}
