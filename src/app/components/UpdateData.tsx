"use client";
import { useEffect, useState } from "react";
import { listItems } from "../constants";
import { addDoc, collection } from "firebase/firestore";
import db from "../utils/firestore";
import { removeVietnameseTones, spaceToSlash } from "../constants/common";
import { ProductTypes } from "../types/common";

const UpdateData = () => {
  const [id, setId] = useState("");
  const [field, setField] = useState("");
  const [value, setValue] = useState("");
  console.log(listItems);
  const date = new Date().toDateString();

  useEffect(() => {
    const fetchData = async (product: ProductTypes) => {
      try {
        const docRef = await addDoc(collection(db, "products"), {
          ...product,
          content: JSON.stringify(product.content).replaceAll("\\", ""),
          href:
            "/product/" + spaceToSlash(removeVietnameseTones(product.title)),
          date: date,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    for (const product of listItems) {
      fetchData(product);
    }
  }, []);

  return <div></div>;
};

export default UpdateData;
