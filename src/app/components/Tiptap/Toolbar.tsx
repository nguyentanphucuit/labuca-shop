import {
  Bold,
  Code,
  Heading2,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
  Upload,
} from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { ToolbarProps } from "../../types/common";

const Toolbar = ({ editor }: ToolbarProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImage = useCallback(() => {
    // Trigger file input click
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!file || !editor) return;

      setIsUploading(true);

      try {
        // Generate a unique public_id for the image
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const publicId = `tiptap_image_${timestamp}_${randomId}`;

        // Upload to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("public_id", publicId);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();

        // Insert the uploaded image into the editor
        editor
          .chain()
          .focus()
          .setImage({
            src: data.url,
            alt: file.name,
            title: file.name,
          })
          .run();
      } catch (error) {
        console.error("Image upload error:", error);
        // Fallback to URL prompt if upload fails
        const url = window.prompt("Upload failed. Enter image URL manually:") || "";
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      } finally {
        setIsUploading(false);
      }
    },
    [editor]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file);
      }
      // Reset the input value so the same file can be selected again
      e.target.value = "";
    },
    [handleImageUpload]
  );

  if (!editor) return null;

  const listToolbar = [
    {
      name: "bold",
      icon: <Bold className="w-5 h-5" />,
      handleClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      icon: <Italic className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().toggleItalic().run();
      },
    },
    {
      name: "underline",
      icon: <Underline className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().toggleUnderline().run();
      },
    },
    {
      name: "strikethrough",
      icon: <Strikethrough className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().toggleStrike().run();
      },
    },
    {
      name: "heading",
      icon: <Heading2 className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
    },
    {
      name: "list",
      icon: <List className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().toggleBulletList().run();
      },
    },
    {
      name: "list-ordered",
      icon: <ListOrdered className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().toggleOrderedList().run();
      },
    },
    {
      name: "blockquote",
      icon: <Quote className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().toggleBlockquote().run();
      },
    },
    {
      name: "code",
      icon: <Code className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().toggleCode().run();
      },
    },
    {
      name: "undo",
      icon: <Undo className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().undo().run();
      },
    },
    {
      name: "redo",
      icon: <Redo className="w-5 h-5" />,
      handleClick: () => {
        editor.chain().focus().redo().run();
      },
    },
    {
      name: "image",
      icon: isUploading ? (
        <Upload className="w-5 h-5 animate-spin" />
      ) : (
        <ImagePlus className="w-5 h-5" />
      ),
      handleClick: addImage,
      disabled: isUploading,
    },
  ];

  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex justify-start items-center gap-5 w-full lg:w-10/20 flex-wrap">
        {listToolbar.map((item) => (
          <button
            key={item.name}
            onClick={(e) => {
              e.preventDefault();
              if (!item.disabled) {
                item.handleClick();
              }
            }}
            disabled={item.disabled}
            className={
              editor.isActive(item.name, item.name === "heading" && { level: 2 })
                ? "bg-sky-700 text-white p-2 rounded-lg"
                : item.disabled
                  ? "text-gray-400 p-2 rounded-lg cursor-not-allowed"
                  : "text-sky-400 p-2 rounded-lg hover:bg-sky-100 transition-colors"
            }
            title={item.name === "image" && isUploading ? "Uploading..." : ""}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
