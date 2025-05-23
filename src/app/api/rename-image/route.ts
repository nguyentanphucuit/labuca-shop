import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req: Request) {
  try {
    const { old_public_id, new_public_id } = await req.json();

    if (!old_public_id || !new_public_id) {
      return NextResponse.json(
        { error: 'Both old and new public_id are required' },
        { status: 400 }
      );
    }

    // Rename (move) image to new public_id
    const result = await cloudinary.uploader.rename(old_public_id, new_public_id);

    return NextResponse.json({ message: 'Image renamed', result });
  } catch (error) {
    console.error('Error renaming image:', error);
    return NextResponse.json({ error: 'Failed to rename image' }, { status: 500 });
  }
}
