"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { FOLDER_IMAGE } from "../constants";
import Image from "next/image";

const Carousel = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/get-images?folder=${FOLDER_IMAGE}`);
        const data = await response.json();

        if (response.ok) {
          setImages(
            data
              .filter((img: any) => img.secure_url.includes("LabucaBanner_"))
              .map((img: any) => img.secure_url)
          );
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
      }
    };

    fetchImages();
  }, []);
  console.log(images);

  return (
    images.length > 0 && (
      <div className="w-96 sm:container mx-auto px-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={1}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="rounded-xl overflow-cover">
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Image
                src={src}
                alt={src}
                width={500}
                height={300}
                style={{ width: "100vw", height: "35vw" }}
                unoptimized
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default Carousel;
