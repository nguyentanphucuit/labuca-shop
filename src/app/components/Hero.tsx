"use client";
import { useAllProducts } from "@/app/hooks/useProducts";
import CarouselSection from "./CarouselSection";
import ListItem from "./ListItem";

const Hero = () => {
  const { products: items, loading, error } = useAllProducts();

  if (error) {
    console.error("Error loading products:", error);
  }

  return (
    <div className="mx-auto">
      {/* <Image className="" alt="labuca button" src={sourceImg} /> */}
      <CarouselSection />
      {/* <UpdateData /> */}
      <ListItem items={items} loading={loading} />
    </div>
  );
};

export default Hero;
