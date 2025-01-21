"use client";

import { useState } from "react";
import Image from "next/image";
import Loading from "./Loading";

const UploadForm = ({
  uploadedImage,
  setUploadedImage,
}: {
  uploadedImage: {
    url: string;
    publicId: string;
  } | null;
  setUploadedImage: (
    uploadedImage: { url: string; publicId: string } | null
  ) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setUploadedImage({ url: data.url, publicId: data.public_id });
      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDelete = async () => {
    console.log(uploadedImage);
    if (!uploadedImage?.publicId) return;
    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        body: JSON.stringify({ publicId: uploadedImage.publicId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Delete failed");
      const result = await response.json();
      // alert(result.message);
      setUploadedImage(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-72">
      <h2 className="p-2 text-white bg-sky-500 w-32">Upload image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
      />
      <Loading loading={loading} />
      {uploadedImage && (
        <Image
          src={uploadedImage.url}
          alt="Uploaded"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "240px" }}
          priority
        />
      )}
    </div>
  );
};

export default UploadForm;
