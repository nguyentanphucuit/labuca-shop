'use client';

import { useState } from 'react';
import Image from 'next/image';
import Loading from './Loading';

const UploadForm = ({
  uploadedImage,
  setUploadedImage,
  newPublicId,
}: {
  uploadedImage: {
    url: string;
    publicId: string;
  } | null;
  setUploadedImage: (uploadedImage: { url: string; publicId: string } | null) => void;
  newPublicId: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('public_id', newPublicId || '');
    console.log(formData);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadedImage({
        url: data.url,
        publicId: newPublicId,
      });
      setLoading(false);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleDelete = async () => {
    console.log(uploadedImage);
    if (!uploadedImage?.publicId) return;
    try {
      const response = await fetch('/api/delete', {
        method: 'POST',
        body: JSON.stringify({ publicId: uploadedImage.publicId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Delete failed');
      const result = await response.json();
      // alert(result.message);
      setUploadedImage(null);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-72">
      <h2 className="p-2 text-white bg-sky-500 w-32">Upload image</h2>

      {!newPublicId ? (
        <>
          <span className="text-sm text-red-500">Nhập mã sản phẩm để upload hình</span>
        </>
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={e => e.target.files && handleUpload(e.target.files[0])}
        />
      )}

      <Loading loading={loading} />
      {uploadedImage && (
        <Image src={uploadedImage.url} alt="Uploaded" width={640} height={160} priority />
      )}
    </div>
  );
};

export default UploadForm;
