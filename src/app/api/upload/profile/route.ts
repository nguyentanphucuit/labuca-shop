import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Configure Cloudinary with environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("Profile upload request received");

    // Ensure the request body is provided
    if (!req.body) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const formData = await req.formData();
    console.log("Profile form data received");

    const file = formData.get("file") as Blob;
    const public_id = formData.get("public_id") as string;

    if (!file) {
      console.error("No file found in profile upload request");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type for profile pictures
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    // Validate file size (5MB limit for profile pictures)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
    }

    console.log("Uploading profile picture to Cloudinary...");

    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload with profile-specific settings
    const uploadResult = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "labuca/profiles", // Separate folder for profile pictures
          public_id: public_id,
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" }, // Auto-crop to face
            { quality: "auto", fetch_format: "auto" }, // Optimize quality and format
          ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary profile upload error:", error);
            reject(error);
          } else {
            resolve(result as cloudinary.UploadApiResponse);
          }
        }
      );
      uploadStream.end(buffer);
    });

    console.log("Profile upload successful:", uploadResult.public_id);

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (error) {
    console.error("Profile upload server error:", error);
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { error: "Profile upload failed", details: errorMessage },
      { status: 500 }
    );
  }
}
