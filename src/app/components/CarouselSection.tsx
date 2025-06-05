"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css/bundle";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BANNER_FOLDER } from "../constants";

const CarouselSkeleton = () => (
  <div className="hidden md:block w-[2000px] max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
    <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
  </div>
);

const Carousel = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🎠 Carousel fetching banners from multiple locations...");

    const fetchAllBanners = async () => {
      try {
        // Fetch from banner subfolder
        const bannerFolderResponse = await fetch(`/api/get-images?folder=${BANNER_FOLDER}`);
        const bannerFolderData = await bannerFolderResponse.json();

        // Fetch from main labuca folder for older banners
        const mainFolderResponse = await fetch(`/api/get-images?folder=labuca`);
        const mainFolderData = await mainFolderResponse.json();

        let allBannerImages = [];

        // Add images from banner subfolder
        if (bannerFolderResponse.ok && Array.isArray(bannerFolderData)) {
          allBannerImages.push(...bannerFolderData);
        }

        // Add banner images from main folder (ones with "banner_" that aren't already in subfolder)
        if (mainFolderResponse.ok && Array.isArray(mainFolderData)) {
          const mainFolderBanners = mainFolderData.filter(
            (img: any) =>
              img.public_id.includes("banner_") && !img.public_id.includes("labuca/banner/")
          );
          allBannerImages.push(...mainFolderBanners);
        }

        // Filter only visible banners
        const bannerSettings = JSON.parse(localStorage.getItem("bannerSettings") || "{}");
        const visibleBanners = allBannerImages.filter((img: any) => {
          const isVisible = bannerSettings[img.public_id]?.isVisible ?? true;
          return isVisible;
        });

        // Sort by priority (higher priority first)
        const sortedBanners = visibleBanners
          .map((img: any) => ({
            ...img,
            priority: bannerSettings[img.public_id]?.priority ?? 0,
          }))
          .sort((a, b) => b.priority - a.priority);

        console.log("🎠 Carousel found", allBannerImages.length, "total banner images");
        console.log("🎠 Carousel showing", sortedBanners.length, "visible banner images");
        setImages(sortedBanners.map((img: any) => img.secure_url) || []);
      } catch (error) {
        console.error("🎠 Carousel fetch error:", error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBanners();
  }, []);

  if (isLoading || !images.length) return <CarouselSkeleton />;

  console.log("🎠 Carousel displaying", images.length, "banner images");

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
