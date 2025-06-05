import { FOLDER_IMAGE } from "@/app/constants";
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
    console.log("Upload request received");

    // Ensure the request body is provided
    if (!req.body) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const formData = await req.formData();
    console.log("Form data received:", formData);

    const file = formData.get("file") as Blob;
    const public_id = formData.get("public_id") as string;
    const folder = formData.get("folder") as string;

    console.log("📁 Upload parameters:", {
      hasFile: !!file,
      public_id: public_id,
      folder: folder || FOLDER_IMAGE,
    });

    if (!file) {
      console.error("No file found in request");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("Uploading file to Cloudinary...");

    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Use the provided folder or fallback to FOLDER_IMAGE
    const targetFolder = folder || FOLDER_IMAGE;

    console.log("🎯 Target folder for upload:", targetFolder);

    // Wrap Cloudinary upload in a promise and return the result properly
    const uploadResult = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: targetFolder,
          public_id: public_id,
          // Ensure the folder structure is created
          use_filename: false,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("✅ Cloudinary upload result:", {
              public_id: result?.public_id,
              folder: result?.folder,
              secure_url: result?.secure_url,
            });
            resolve(result as cloudinary.UploadApiResponse);
          }
        }
      );
      uploadStream.end(buffer);
    });

    console.log("Upload successful:", uploadResult);

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (error) {
    console.error("Server error:", error);
    const errorMessage = (error as Error).message;
    return NextResponse.json({ error: "Server error", details: errorMessage }, { status: 500 });
  }
}
