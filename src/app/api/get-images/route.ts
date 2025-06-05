import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");

    console.log("🔍 GET /api/get-images called with folder:", folder);

    if (!folder) {
      console.log("❌ No folder provided");
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    console.log("📡 Fetching from Cloudinary folder:", folder);

    // Fetch all images from the specified folder
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder, // Fetch only images from this folder
      max_results: 50, // Increase limit to see more images
    });

    console.log("📊 ALL images found in folder:", folder);
    console.log("Total count:", result.resources?.length || 0);

    // Log all image details
    result.resources?.forEach((img: any, index: number) => {
      console.log(`Image ${index + 1}:`, {
        public_id: img.public_id,
        display_name: img.display_name || "no display name",
        filename: img.filename || "no filename",
        secure_url: img.secure_url,
      });
    });

    // Separate images with and without "banner_" prefix
    const bannerPrefixImages =
      result.resources?.filter((img: any) => img.public_id.includes("banner_")) || [];

    const otherImages =
      result.resources?.filter((img: any) => !img.public_id.includes("banner_")) || [];

    console.log("🏷️ Images with 'banner_' prefix:", bannerPrefixImages.length);
    console.log("🏷️ Other images:", otherImages.length);

    if (otherImages.length > 0) {
      console.log("📋 Other images list:");
      otherImages.forEach((img: any, index: number) => {
        console.log(`  ${index + 1}. ${img.public_id}`);
      });
    }

    // Return ALL images from the folder (no filtering)
    return NextResponse.json(result.resources || []);
  } catch (error) {
    console.error("💥 Error fetching images:", error);
    return NextResponse.json({ error: "Failed to get images" }, { status: 500 });
  }
}
