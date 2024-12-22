'use client';

import React, { useState, useEffect } from 'react';
import Footer from '@/app/components/Footer';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const Page = () => {
  const [showDropdown, setShowDropdown] = useState(null);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/batteryGet');
        const stream = await response.body.getReader();
        const { done, value } = await stream.read();
        if (!done) {
          const text = new TextDecoder().decode(value);
          const data = JSON.parse(text.match(/data: (.+)/)[1]);

          setGroupedData(data.averagePanelData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="px-4 my-6">
        <h1 className="text-xl font-semibold mb-3" style={{ color: '#167D0A' }}>MicroGreens</h1>
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="font-bold bg-gray-50 p-2 rounded-sm text-center border-b-4">
                  Date (Grouped per Hour)
                </th>
              </tr>
            </thead>
            <tbody>
              {groupedData.map((item, index) => (
                <React.Fragment key={index}>
                  <tr className="border-b-2">
                    <td className="text-center bg-gray-50 h-12 flex justify-between items-center">
                      <h1 className="ml-10">
                        {item.grouped_datetime}
                      </h1>
                      <button
                        className="mr-10"
                        onClick={() =>
                          setShowDropdown((prev) => (prev === index ? null : index))
                        }
                        aria-label="Toggle detail table"
                      >
                        {showDropdown === index ? (
                          <IoIosArrowDropup size={20} />
                        ) : (
                          <IoIosArrowDropdown size={20} />
                        )}
                      </button>
                    </td>
                  </tr>

                  {showDropdown === index && (
                    <tr>
                      <td colSpan="5" className="p-0">
                        <table className="w-full bg-gray-100">
                          <thead>
                            <tr>
                              <th className='font-normal bg-slate-200'>Avg Volt Battery</th>
                              <th className='font-normal bg-slate-200'>Avg Temp Battery</th>
                              {/* <th className='font-normal bg-slate-200'>Avg Temp Battery</th>
                              <th className='font-normal bg-slate-200'>Avg Light</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className='text-center text-sm'>{item.avg_batteryVoltage?.toFixed(2)} V</td>
                              <td className='text-center text-sm'>{item.avg_temperatureCbattery?.toFixed(2)}°C</td>
                              {/* <td className='text-center text-sm'>{item.avg_temperatureCbattery?.toFixed(2)}°C</td>
                              <td className='text-center text-sm'>{item.avg_lux?.toFixed(2)} Lux</td> */}
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
