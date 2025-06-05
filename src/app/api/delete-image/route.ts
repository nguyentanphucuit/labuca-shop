import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req: Request) {
  try {
    const { public_id } = await req.json();
    console.log("🗑️ Delete request received for:", public_id);

    if (!public_id) {
      return NextResponse.json({ error: "public_id is required" }, { status: 400 });
    }

    // Use the full public_id as provided (it already includes the folder structure)
    console.log("🗑️ Attempting to delete from Cloudinary:", public_id);
    const result = await cloudinary.uploader.destroy(public_id);

    console.log("🗑️ Cloudinary delete result:", result);

    if (result.result === "ok") {
      console.log("✅ Image successfully deleted:", public_id);
      return NextResponse.json({ message: "Image deleted successfully", result });
    } else {
      console.log("⚠️ Image deletion failed or image not found:", result);
      return NextResponse.json({ message: "Image deletion completed", result });
    }
  } catch (error) {
    console.error("💥 Error deleting image:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
