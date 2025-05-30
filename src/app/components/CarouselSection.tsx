"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css/bundle";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FOLDER_IMAGE } from "../constants";

const CarouselSkeleton = () => (
  <div className="hidden md:block w-[2000px] max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
    <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
  </div>
);

const Carousel = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/get-images?folder=${FOLDER_IMAGE}`)
      .then((res) => res.json())
      .then((data) =>
        setImages(
          data
            ?.filter((img: any) => img.secure_url.includes("LabucaBanner_"))
            .map((img: any) => img.secure_url)
        )
      )
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !images.length) return <CarouselSkeleton />;

  return (
    <div className="hidden md:block max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="rounded-2xl overflow-hidden group"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="aspect-[21/9] relative">
              <Image
                src={src}
                alt={`Banner ${i + 1}`}
                fill
                priority={!i}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #b14bf4;
          width: 24px;
          border-radius: 4px;
        }
        .swiper-button-prev,
        .swiper-button-next {
          width: 48px !important;
          height: 48px !important;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          color: #333;
          opacity: 0;
          transition: 0.2s;
        }
        .swiper:hover .swiper-button-prev,
        .swiper:hover .swiper-button-next {
          opacity: 1;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 1.5rem !important;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
