"use client";

import React from "react";
import { FaPrint } from "react-icons/fa6";

const PrintButton = () => {
    const downloadCSV = async (type) => {
        const url = `/api/getSave?type=${type}`;
        const response = await fetch(url);

        if (response.ok) {
            const blob = await response.blob();
            const urlBlob = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = urlBlob;
            link.download = `${type}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error(`Error downloading ${type} data`);
        }
    };

    return (
        <>
            <div className=" flex justify-between items-center p-2 bg-gray-200 rounded-sm mb-5">
                <button
                    onClick={() => downloadCSV("incubator")}
                    className="btn btn-primary"
                >
                    Print Incubator
                </button>
                <FaPrint size={20} />
            </div>
            <div className=" flex justify-between items-center p-2 bg-gray-200 rounded-sm">
                <button
                    onClick={() => downloadCSV("battery")}
                    className="btn btn-secondary"
                >
                    Print PLTS
                </button>
                <FaPrint size={20} />
            </div>
        </>

    );
};

export default PrintButton;
