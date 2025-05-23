'use client';
import React, { useEffect, useState } from 'react';
import ListItem from '@/app/components/ListItem';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/app/utils/firestore';
import { ProductTypes } from '@/app/types/common';
import { emptyProduct } from '@/app/constants';

const HighHeels = () => {
  const [items, setItems] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setItems(
        querySnapshot.docs.map(doc => {
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
  console.log(items);
  return (
    <div className="mx-auto">
      <ListItem items={items} loading={loading} />
    </div>
  );
};

export default HighHeels;
