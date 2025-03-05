"use client";
import ImageUploader from "@/app/components/ImageUploader";
import { BANNER_IMAGE, FOLDER_IMAGE } from "@/app/constants";
import DeleteImageModal from "@/app/modal/DeleteImageModal";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [folder, setFolder] = useState(FOLDER_IMAGE); // Default folder name
  const [publicId, setPublicId] = useState("");
  const [publicIdCurrent, setPublicIdCurrent] = useState("");
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/get-images?folder=${folder}`);
        const data = await response.json();
        const listID = data.map((img: any) =>
          parseInt(img.public_id.split("_")[1])
        );
        const newID = listID.length !== 0 ? Math.max(...listID) + 1 : 0;
        console.log(newID);
        setPublicId(`${BANNER_IMAGE}${newID}`);

        if (response.ok) {
          setImages(data.map((img: any) => img.secure_url));
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const onDeleteImageBanner = (publicIdCurrent: string) => {
    setShowDeleteModal(!showDeleteModal);
    setPublicIdCurrent(publicIdCurrent);
    console.log("Delete Image : ", publicIdCurrent);
  };

  return (
    <div className="flex flex-col items-center gap-4 pt-12 px-10">
      <DeleteImageModal
        showDeleteModal={showDeleteModal}
        public_id={publicIdCurrent}
        setShowDeleteModal={setShowDeleteModal}
      />
      <h1 className="text-xl font-bold uppercase bg-orange-500 text-white p-4 rounded-md">
        Tổng hợp hình ảnh banner
      </h1>
      <ImageUploader
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        newPublicId={publicId}
      />

      <table className="w-full p-10 table-fixed border border-gray-400">
        <thead className="">
          <tr>
            <th className="w-1/6 p-4">Code</th>
            <th className="w-1/12 p-4">Image</th>
            <th className="w-2/6 p-4">Title</th>

            {/* <th className="w-1/12 p-4">Edit</th> */}
            <th className="w-1/12 p-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {images.map((url, index) => (
            <tr className="border border-gray-400" key={index}>
              <td className="p-4">
                <div className="flex justify-center items-center">
                  <p className="line-clamp-2">
                    {url.split("/")?.pop()?.split(".")[0] as string}
                  </p>
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center items-center">
                  <Image
                    key={index}
                    src={url}
                    width={150}
                    height={150}
                    alt={`Cloudinary Image ${index}`}
                  />
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center items-center ">
                  <p className="line-clamp-2">{url}</p>
                </div>
              </td>

              {/* <td className="p-4">
                <div className="flex justify-center items-center">
                  <button onClick={() => onEditImageBanner(imageBanner)}>
                    <Pencil className="p-1 rounded-sm bg-orange-300 text-orange-600 w-6 h-6" />
                  </button>
                </div>
              </td> */}
              <td className="p-4">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() =>
                      onDeleteImageBanner(
                        url.split("/")?.pop()?.split(".")[0] as string
                      )
                    }>
                    <Trash2 className="p-1 rounded-sm bg-red-300 text-red-600 w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImageGallery;
