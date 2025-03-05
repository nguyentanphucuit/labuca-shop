import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");

    if (!folder) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }

    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder, // Fetch only images from this folder
      max_results: 20, // Limit results
    });
    console.log(result);

    return NextResponse.json(
      result.resources.filter((img: any) =>
        img.public_id.includes("LabucaBanner_")
      )
    );
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to get images" },
      { status: 500 }
    );
  }
}
