import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import db from "./firestore";

/**
 * Bulk update all products with new color set: "đen, trắng, nâu, kem, đỏ"
 */
export const bulkUpdateProductColors = async () => {
  const newColorString = "Đen, Trắng, Nâu, Kem, Đỏ";

  try {
    console.log("🔄 Starting bulk update of product colors...");

    // Get all products from Firestore
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);

    const updatePromises: Promise<void>[] = [];
    let totalProducts = 0;

    querySnapshot.forEach((docSnapshot) => {
      totalProducts++;
      const productRef = doc(db, "products", docSnapshot.id);

      // Update each product with the new color set
      const updatePromise = updateDoc(productRef, {
        color: newColorString,
      });

      updatePromises.push(updatePromise);
    });

    console.log(`📊 Found ${totalProducts} products to update`);

    // Execute all updates
    await Promise.all(updatePromises);

    console.log("✅ Successfully updated all products with new colors:", newColorString);
    return {
      success: true,
      message: `Successfully updated ${totalProducts} products`,
      totalUpdated: totalProducts,
      newColors: newColorString,
    };
  } catch (error) {
    console.error("❌ Error during bulk update:", error);
    return {
      success: false,
      message: "Failed to update products",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Update a single product's colors
 */
export const updateSingleProductColors = async (productId: string) => {
  const newColorString = "Đen, Trắng, Nâu, Kem, Đỏ";

  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      color: newColorString,
    });

    console.log(`✅ Updated product ${productId} with new colors`);
    return { success: true, productId, newColors: newColorString };
  } catch (error) {
    console.error(`❌ Error updating product ${productId}:`, error);
    return {
      success: false,
      productId,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Clean up product content by removing extra quotes and JSON encoding
 */
export const cleanUpProductContent = async () => {
  try {
    console.log("🔄 Starting cleanup of product content...");

    // Get all products from Firestore
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);

    const updatePromises: Promise<void>[] = [];
    let totalProducts = 0;
    let cleanedProducts = 0;

    querySnapshot.forEach((docSnapshot) => {
      totalProducts++;
      const productData = docSnapshot.data();

      // Check if content needs cleaning
      if (productData.content && typeof productData.content === "string") {
        let cleanedContent = productData.content;

        // Remove leading and trailing quotes
        if (
          (cleanedContent.startsWith('"') && cleanedContent.endsWith('"')) ||
          (cleanedContent.startsWith("'") && cleanedContent.endsWith("'"))
        ) {
          cleanedContent = cleanedContent.slice(1, -1);
          cleanedProducts++;

          const productRef = doc(db, "products", docSnapshot.id);
          const updatePromise = updateDoc(productRef, {
            content: cleanedContent,
          });

          updatePromises.push(updatePromise);
        }
      }
    });

    console.log(`📊 Found ${totalProducts} products, ${cleanedProducts} need content cleanup`);

    if (cleanedProducts > 0) {
      // Execute all updates
      await Promise.all(updatePromises);

      console.log("✅ Successfully cleaned up product content");
      return {
        success: true,
        message: `Successfully cleaned up ${cleanedProducts} products`,
        totalProducts,
        cleanedProducts,
      };
    } else {
      console.log("✅ No products needed content cleanup");
      return {
        success: true,
        message: "No products needed content cleanup",
        totalProducts,
        cleanedProducts: 0,
      };
    }
  } catch (error) {
    console.error("❌ Error during content cleanup:", error);
    return {
      success: false,
      message: "Failed to cleanup product content",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
