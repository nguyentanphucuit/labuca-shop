"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import sourceImg from "/public/assets/img/background.png";

import ListItem from "./ListItem";
import CarouselSection from "./CarouselSection";
import { collection, getDocs } from "firebase/firestore";
import db from "@/app/utils/firestore";
import { ProductTypes } from "@/app/types/common";

const Hero = () => {
  const [items, setItems] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setItems(
        querySnapshot.docs.map((doc) => {
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
        })
      );
    };
    setLoading(true);
    fetchItems();
    setLoading(false);
  }, []);
  return (
    <div className="mx-auto">
      {/* <Image className="" alt="labuca button" src={sourceImg} /> */}
      <CarouselSection />
      {/* <UpdateData /> */}
      <ListItem items={items} loading={false} />
    </div>
  );
};

export default Hero;
