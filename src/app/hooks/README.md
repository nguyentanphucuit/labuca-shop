# Product Data Reading Hooks

This directory contains custom hooks that provide consistent data reading patterns for your Firestore product collection.

## Available Hooks

### 1. `useAllProducts()`

Fetches all products from the database.

```typescript
import { useAllProducts } from "@/app/hooks/useProducts";

const MyComponent = () => {
  const { products, loading, error } = useAllProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};
```

### 2. `useProductsByType(typeValue: string)`

Fetches products filtered by type.

```typescript
import { useProductsByType } from "@/app/hooks/useProducts";

const HighHeels = () => {
  const { products, loading, error } = useProductsByType("1");

  // Handle loading and error states...

  return <ProductsList products={products} />;
};
```

**Type Values:**

- `"1"` - High Heels (Giày Cao Gót)
- `"2"` - Wedges (Giày Đế Xuồng)
- `"3"` - Flats (Giày Búp Bê)
- `"4"` - Sandals (Dép/Sandal)
- `"5"` - Slippers (Dép Lào)

### 3. `useProductById(productId: string)`

Fetches a single product by its Firestore document ID.

```typescript
import { useProductById } from "@/app/hooks/useProducts";

const ProductDetail = ({ productId }: { productId: string }) => {
  const { product, loading, error } = useProductById(productId);

  if (loading) return <div>Loading product...</div>;
  if (error || !product) return <div>Product not found</div>;

  return <ProductDetailView product={product} />;
};
```

### 4. `useProductBySlug(slug: string)`

Fetches a product by its URL slug/href.

```typescript
import { useProductBySlug } from "@/app/hooks/useProducts";

const ProductPage = ({ slug }: { slug: string }) => {
  const { product, loading, error } = useProductBySlug(slug);

  if (loading) return <LoadingSpinner />;
  if (error || !product) return <NotFound />;

  return <ProductView product={product} />;
};
```

### 5. `useProducts(typeValue?: string)`

Main hook with filtering capabilities.

```typescript
import { useProducts } from "@/app/hooks/useProducts";

const ProductsPage = () => {
  const { products, allProducts, loading, error, filterProducts } = useProducts();

  const handleSearch = (searchTerm: string) => {
    filterProducts(searchTerm);
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <ProductGrid products={products} loading={loading} />
    </div>
  );
};

// Or with type filtering
const TypedProductsPage = () => {
  const { products, loading, filterProducts } = useProducts("1"); // Only high heels

  return <ProductsList products={products} />;
};
```

### 6. `fetchProductDetails(itemId: string)` (Utility Function)

Standalone utility function for fetching minimal product details (used in CartContext).

```typescript
import { fetchProductDetails } from "@/app/hooks/useProducts";

const addToCart = async (productId: string) => {
  const productDetails = await fetchProductDetails(productId);
  if (productDetails) {
    // Add to cart with details
    console.log(productDetails); // { title, price, imageUrl, discount }
  }
};
```

## Data Structure

All hooks return products with this consistent structure:

```typescript
interface ProductTypes {
  id: string; // Firestore document ID
  code: string; // Product code
  title: string; // Product title
  subtitle: string; // Product subtitle
  imageUrl: string; // Main product image
  href: string; // Product URL slug
  content: string; // Product description (HTML/JSON)
  color: string; // Available colors (comma-separated)
  size: string; // Available sizes (comma-separated)
  typeValue: string; // Product type value
  typeLabel: string; // Product type label
  date: string; // Creation date
  price: number; // Original price
  discount: number; // Discount percentage
}
```

## Error Handling

All hooks provide consistent error handling:

```typescript
const { products, loading, error } = useAllProducts();

if (error) {
  console.error("Error loading products:", error);
  // Handle error appropriately
}
```

## Migration Guide

### Before (Old Pattern)

```typescript
const [items, setItems] = useState<ProductTypes[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          code: data.code,
          // ... manual mapping
        };
      });
      setItems(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchItems();
}, []);
```

### After (New Pattern)

```typescript
const { products: items, loading, error } = useAllProducts();

if (error) {
  console.error("Error loading products:", error);
}
```

## Benefits

1. **Consistency**: All data reading follows the same pattern
2. **Reusability**: No more duplicated fetching logic
3. **Type Safety**: Consistent TypeScript interfaces
4. **Error Handling**: Centralized error management
5. **Performance**: Optimized queries and caching
6. **Maintainability**: Single source of truth for data mapping
