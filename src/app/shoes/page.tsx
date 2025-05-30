"use client";
import ListItem from "@/app/components/ListItem";
import { useAllProducts } from "@/app/hooks/useProducts";

const Shoes = () => {
  const { products: items, loading, error } = useAllProducts();

  console.log(items);
  return (
    <div className="mx-auto">
      <ListItem items={items} loading={loading} error={error} />
    </div>
  );
};

export default Shoes;
