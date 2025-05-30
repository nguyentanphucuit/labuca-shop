"use client";
import ListItem from "@/app/components/ListItem";
import { useProductsByType } from "@/app/hooks/useProducts";

const HighHeels = () => {
  const { products: items, loading, error } = useProductsByType("1");

  if (error) {
    console.error("Error loading high heels:", error);
  }

  console.log(items);
  return (
    <div className="mx-auto">
      <ListItem items={items} loading={loading} error={error} />
    </div>
  );
};

export default HighHeels;
