"use client";
import { useEffect, useState } from "react";

import { ProductTypes } from "@/app/types/common";
import db from "@/app/utils/firestore";
import { collection, getDocs } from "firebase/firestore";
import CarouselSection from "./CarouselSection";
import ListItem from "./ListItem";

const Hero = () => {
  const [items, setItems] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            code: data.code,
            typeValue: data.typeValue,
            typeLabel: data.typeLabel,
            date: data.date,
            title: data.title,
            imageUrl: data.imageUrl,
            size: data.size,
            color: data.color,
            subtitle: data.subtitle,
            href: data.href,
            content: data.content,
            price: data.price,
            discount: data.discount,
          };
        });
        setItems(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchItems();
  }, []);

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
