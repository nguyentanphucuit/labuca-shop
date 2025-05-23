'use client';
import { useEffect, useState } from 'react';
import { listItem } from '../constants';
import { addDoc, collection } from 'firebase/firestore';
import db from '../utils/firestore';
import { removeVietnameseTones, spaceToSlash } from '../constants/common';
import { ProductTypes } from '../types/common';

const UpdateData = () => {
  const fetchData = async (product: ProductTypes) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        content: JSON.stringify(product.content).replaceAll('\\', ''),
        href: '/products/' + spaceToSlash(removeVietnameseTones(product.title)),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const handleOnClick = () => {
    for (const product of listItem) {
      fetchData(product);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-4">
      <button className="p-4 w-40  bg-sky-500 text-white" onClick={handleOnClick}>
        UPDATE DATA
      </button>
    </div>
  );
};

export default UpdateData;
