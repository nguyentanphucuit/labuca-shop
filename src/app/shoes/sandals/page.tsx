"use client";
import ListItem from "@/app/components/ListItem";
import { ProductTypes } from "@/app/types/common";
import db from "@/app/utils/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Sandals = () => {
  const [items, setItems] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(db, "products"), where("typeValue", "==", "4"));
        const querySnapshot = await getDocs(q);
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
  console.log(items);
  return (
    <div className="mx-auto">
      <ListItem items={items} loading={loading} />
    </div>
  );
};

export default Sandals;
