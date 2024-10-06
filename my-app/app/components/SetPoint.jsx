import React from "react";
import Link from "next/link";

const SetPoint = () => {
  return (
    <div className="w-full flex items-center justify-center py-5">
      <Link href="/setPo" className="bg-blue-500 p-3 rounded-lg w-1/2 text-center">
        Change Set Point
      </Link>
    </div>
  );
};

export default SetPoint;
