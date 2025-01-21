"use client";
import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { collection, getDocs } from "firebase/firestore";
import db from "@/app/utils/firestore";
import { ProductTypes } from "../types/common";
import { emptyProduct } from "../constants";

const HighHeels = () => {
  const [items, setItems] = useState<ProductTypes[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setItems(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            code: data.code,
            type: data.type,
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

    fetchItems();
  }, []);
  console.log(items);
  return (
    <div className="mx-auto">
      <ListItem items={items} />
    </div>
  );
};

export default HighHeels;
