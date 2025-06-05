"use client";

import { AlertCircle, Image as ImageIcon, RefreshCw, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Loading from "./Loading";

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
  const [isDragOver, setIsDragOver] = useState(false);

  const handleUpload = async (file: File, isReplacement = false) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("public_id", newPublicId || "");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setUploadedImage({
        url: data.url,
        publicId: newPublicId,
      });
      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file, false);
    }
    // Reset input
    e.target.value = "";
  };

  const handleReplaceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file, true);
    }
    // Reset input
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file, !!uploadedImage);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  if (!newPublicId) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-sm text-red-700">
            Vui lòng nhập mã sản phẩm trước khi upload hình ảnh
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Upload Area */}
      {!uploadedImage && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={loading}
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div
              className={`p-2 rounded-full transition-colors ${
                isDragOver ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <Upload
                className={`w-5 h-5 transition-colors ${
                  isDragOver ? "text-blue-600" : "text-gray-400"
                }`}
              />
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                {isDragOver ? "Thả hình ảnh vào đây" : "Kéo thả hình ảnh hoặc click để chọn"}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG (tối đa 10MB)</p>
            </div>

            <button
              type="button"
              className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
              disabled={loading}
            >
              Chọn hình ảnh
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
          <Loading loading={loading} />
          <span className="ml-3 text-sm text-gray-600">Đang upload hình ảnh...</span>
        </div>
      )}

      {/* Uploaded Image */}
      {uploadedImage && !loading && (
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <div className="aspect-video w-full">
              <Image
                src={uploadedImage.url}
                alt="Uploaded"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Overlay with replace button */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {/* Replace button */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReplaceFileChange}
                  className="hidden"
                  id={`replace-${newPublicId}`}
                />
                <label
                  htmlFor={`replace-${newPublicId}`}
                  className="flex items-center justify-center p-3 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-xl cursor-pointer transition-all duration-200"
                  title="Thay thế hình ảnh"
                >
                  <RefreshCw className="w-5 h-5" />
                </label>
              </div>
            </div>
          </div>

          {/* Image info */}
          <div className="flex items-center gap-2 mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-green-700">
                Hình ảnh đã được upload thành công
              </span>
              <p className="text-xs text-gray-500 mt-1">Hover để thay thế hình ảnh</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
