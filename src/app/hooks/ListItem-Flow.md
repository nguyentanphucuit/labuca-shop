# ListItem Component: Product Data Flow After API Calls

## Overview

The `ListItem` component is responsible for displaying product data after API calls. It handles all the states that occur during and after data fetching, including loading, error handling, search/filtering, and pagination.

## Data Flow Diagram

```
API Call (useProducts hooks) → ListItem Component → Product Display
     ↓                              ↓                    ↓
[loading: true]              [Show Skeletons]      [ProductSkeleton]
[items: []]                  [Process Data]        [Empty State]
[error: null]                [Filter & Paginate]   [Error State]
     ↓                              ↓                    ↓
[loading: false]             [Render Products]     [ProductDetails]
[items: ProductTypes[]]      [Show Results]        [Real Products]
[error: null]                [Pagination]          [User Interaction]
```

## Component States

### 1. **Loading State**

```typescript
if (loading) {
  return (
    <>
      {Array.from({ length: 8 }, (_, index) => (
        <ProductSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  );
}
```

- Shows 8 skeleton loaders while data is being fetched
- Provides visual feedback to users
- Maintains layout structure

### 2. **Error State**

```typescript
if (error) {
  return (
    <div className="col-span-full text-center py-12">
      <div className="text-red-500 mb-2">⚠️ Có lỗi xảy ra</div>
      <p className="text-gray-600">{error}</p>
      <button onClick={() => window.location.reload()}>
        Thử lại
      </button>
    </div>
  );
}
```

- Displays error message from API call
- Provides retry mechanism
- User-friendly error handling

### 3. **Empty State**

```typescript
if (!items || items.length === 0) {
  return (
    <div className="col-span-full text-center py-12">
      <div className="text-gray-400 mb-2">📦</div>
      <p className="text-gray-600">Chưa có sản phẩm nào</p>
    </div>
  );
}
```

- Handles when no products are available
- Clear messaging for empty database

### 4. **No Search Results**

```typescript
if (filteredSources.length === 0 && query) {
  return (
    <div className="col-span-full text-center py-12">
      <div className="text-gray-400 mb-2">🔍</div>
      <p className="text-gray-600">
        Không tìm thấy sản phẩm cho "{query}"
      </p>
    </div>
  );
}
```

- Specific state for search with no results
- Shows what user searched for

### 5. **Success State**

```typescript
return filteredSources.map((product) => (
  <ProductDetails key={`product-${product.id}`} {...product} />
));
```

- Renders actual product data
- Each product follows consistent data structure

## Data Processing After API Call

### 1. **Memoized Filtering**

```typescript
const { filteredSources, totalPages, totalNumber } = useMemo(() => {
  if (!items || items.length === 0) {
    return { filteredSources: [], totalPages: 0, totalNumber: 0 };
  }

  const sources = fetchFilteredSource(items, query, currentPage);
  const pages = fetchSourcesPage(items, query);
  const total = totalNumberSearchQuery(items, query);

  return {
    filteredSources: sources || [],
    totalPages: pages,
    totalNumber: total,
  };
}, [items, query, currentPage]);
```

**Benefits:**

- Prevents unnecessary recalculations
- Optimizes performance
- Only recalculates when dependencies change

### 2. **Search Filtering**

```typescript
// In fetchFilteredSource function
const listSourceFilters = items.filter((source) =>
  source.title.toLowerCase().includes(query.toLowerCase())
);
```

- Searches through product titles
- Case-insensitive matching
- Real-time filtering as user types

### 3. **Pagination**

```typescript
const start = (currentPage - 1) * sourcesPerPage; // sourcesPerPage = 4
const end = currentPage * sourcesPerPage;
return [...listSourceFilters].slice(start, end);
```

- Shows 4 products per page
- Maintains performance with large datasets
- Slice after filtering for accuracy

## Product Data Structure Validation

Each product rendered has this consistent structure:

```typescript
interface ProductTypes {
  id: string; // ✅ Used as React key
  code: string; // ✅ Searchable field
  title: string; // ✅ Primary search field
  subtitle: string; // ✅ Secondary info
  imageUrl: string; // ✅ Product image
  href: string; // ✅ Product link
  content: string; // ✅ Product description
  color: string; // ✅ Available colors
  size: string; // ✅ Available sizes
  typeValue: string; // ✅ Category filter
  typeLabel: string; // ✅ Category display
  date: string; // ✅ Creation date
  price: number; // ✅ Product price
  discount: number; // ✅ Discount percentage
}
```

## Debug Information

The component logs detailed information for debugging:

```typescript
useEffect(() => {
  console.log("📊 ListItem Data:", {
    totalItems: items?.length || 0,
    filteredItems: filteredSources.length,
    query,
    currentPage,
    loading,
    error,
  });
}, [items, filteredSources, query, currentPage, loading, error]);
```

## Usage Examples

### 1. **All Products Page**

```typescript
const { products: items, loading, error } = useAllProducts();
return <ListItem items={items} loading={loading} error={error} />;
```

### 2. **Category Page**

```typescript
const { products: items, loading, error } = useProductsByType("1");
return <ListItem items={items} loading={loading} error={error} />;
```

### 3. **With Custom Filtering**

```typescript
const { products, filterProducts } = useProducts();
// Custom filtering can be applied before passing to ListItem
```

## Performance Optimizations

1. **Memoization**: Filters are memoized to prevent recalculation
2. **Pagination**: Only render products for current page
3. **Lazy Loading**: Search input has suspense boundary
4. **Efficient Keys**: Unique keys prevent unnecessary re-renders

## Error Handling

The component gracefully handles various error scenarios:

- **Network errors**: Shows retry button
- **Empty data**: Clear empty state messaging
- **Search failures**: Helpful search guidance
- **Firestore errors**: Displays error from hook

## Search & Filter Flow

1. **User types in search** → URL updates with query param
2. **useSearchParams** → Gets current query and page
3. **useMemo** → Filters products based on query
4. **fetchFilteredSource** → Returns paginated results
5. **Render** → Shows filtered products or no results message

This creates a complete, robust system for handling product data at every stage of the API call lifecycle.
