import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { publicId } = await req.json(); // Get the public ID from the request

    if (!publicId) {
      return NextResponse.json(
        { error: "No public ID provided" },
        { status: 400 }
      );
    }

    // Delete the image using Cloudinary API
    const result = await cloudinary.v2.uploader.destroy(publicId);

    if (result.result !== "ok") {
      throw new Error("Failed to delete image");
    }

    return NextResponse.json({ message: "Image deleted successfully", result });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
