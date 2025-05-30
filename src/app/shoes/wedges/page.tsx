"use client";
import ListItem from "@/app/components/ListItem";
import { useProductsByType } from "@/app/hooks/useProducts";

const Wedges = () => {
  const { products: items, loading, error } = useProductsByType("2");

  console.log(items);
  return (
    <div className="mx-auto">
      <ListItem items={items} loading={loading} error={error} />
    </div>
  );
};

export default Wedges;
