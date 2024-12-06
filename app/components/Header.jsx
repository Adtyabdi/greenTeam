import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
// import NewData from './NewData';

const Header = () => {
  return (
    <>
      <div className="px-4">
        <div className="pt-4 pb-2 border-b-4 border-gray-600">
          <Link href="/dashboard">
            <div className="text-2xl font-semibold" style={{ color: '#167D0A' }}>
              <h1 className='pb-2'>MicroGreens</h1>
            </div>
          </Link>
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <Image
                src="/banner.svg"
                alt="Slide 1"
                width={600}
                height={300}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/banner.svg"
                alt="Slide 2"
                width={600}
                height={300}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/banner.svg"
                alt="Slide 3"
                width={600}
                height={300}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* <div className="flex justify-between items-center gap-2 pt-4">
          <div className="p-2 w-1/4 rounded-lg bg-sky-300">
            <h1 className="text-center">26°C</h1>
          </div>
          <div className="p-2 w-1/4 rounded-lg bg-sky-300">
            <h1 className="text-center">51% Rh</h1>
          </div>
          <div className="p-2 w-1/4 rounded-lg bg-sky-300">
            <h1 className="text-center">100 Lux</h1>
          </div>
          <div className="p-2 w-1/4 rounded-lg bg-sky-300">
            <h1 className="text-center">68 %</h1>
          </div>
        </div> */}

        {/* <NewData /> */}
      </div>
    </>
  )
}

export default Header