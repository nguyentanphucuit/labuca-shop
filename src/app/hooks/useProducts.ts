"use client";
import { ProductTypes } from "@/app/types/common";
import db from "@/app/utils/firestore";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

// Helper function to map Firestore document to ProductTypes
const mapDocumentToProduct = (doc: any): ProductTypes => {
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
    imagesByColor: data.imagesByColor,
  };
};

// Hook for fetching all products
export const useAllProducts = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(mapDocumentToProduct);
        setProducts(productsList);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { products, loading, error };
};

// Hook for fetching products by type
export const useProductsByType = (typeValue: string) => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "products"), where("typeValue", "==", typeValue));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(mapDocumentToProduct);
        setProducts(productsList);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (typeValue) {
      fetchItems();
    }
  }, [typeValue]);

  return { products, loading, error };
};

// Hook for fetching a single product by ID
export const useProductById = (productId: string) => {
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = mapDocumentToProduct(docSnap);
          setProduct(productData);
          setError(null);
        } else {
          setProduct(null);
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, loading, error };
};

// Hook for fetching product by href/slug
export const useProductBySlug = (slug: string) => {
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(mapDocumentToProduct);

        const foundProduct = products.find(
          (item) => item.href.toLowerCase() === slug.toLowerCase()
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setError(null);
        } else {
          setProduct(null);
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading, error };
};

// Utility function for fetching product details (used in cart context)
export const fetchProductDetails = async (itemId: string) => {
  try {
    const docRef = doc(db, "products", itemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: data.title,
        price: data.price,
        imageUrl: data.imageUrl,
        discount: data.discount,
      };
    }

    console.warn(`Product not found: ${itemId}`);
    return null;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

// Main products hook with search and filtering capabilities
export const useProducts = (typeValue?: string) => {
  const [allProducts, setAllProducts] = useState<ProductTypes[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        let querySnapshot;

        if (typeValue) {
          const q = query(collection(db, "products"), where("typeValue", "==", typeValue));
          querySnapshot = await getDocs(q);
        } else {
          querySnapshot = await getDocs(collection(db, "products"));
        }

        const productsList = querySnapshot.docs.map(mapDocumentToProduct);
        setAllProducts(productsList);
        setFilteredProducts(productsList);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [typeValue]);

  const filterProducts = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return {
    products: filteredProducts,
    allProducts,
    loading,
    error,
    filterProducts,
  };
};
