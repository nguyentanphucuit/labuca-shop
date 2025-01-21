import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    console.log("Upload request received");

    // Ensure the body parser is disabled for FormData
    if (!req.body) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const formData = await req.formData();
    console.log("Form data received:", formData);

    const file = formData.get("file") as Blob;

    if (!file) {
      console.error("No file found in request");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("Uploading file to Cloudinary...");

    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "labuca" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(
              NextResponse.json(
                { error: "Upload failed", details: error },
                { status: 500 }
              )
            );
          }
          console.log("Upload successful:", result);
          resolve(
            NextResponse.json({
              url: result?.secure_url,
              public_id: result?.public_id,
            })
          );
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Server error:", error);
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { error: "Server error", details: errorMessage },
      { status: 500 }
    );
  }
}
