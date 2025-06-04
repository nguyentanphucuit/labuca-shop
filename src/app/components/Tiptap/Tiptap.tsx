"use client";

import { removeFirstAndLastQuotes } from "@/app/constants/common";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import Toolbar from "./Toolbar";

const Tiptap = ({
  onChange,
  content,
  name,
}: {
  onChange: (newContent: string) => void;
  content: string;
  name: string;
}) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      ImageResize.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px]",
      },
      handleDrop: (view, event, slice, moved) => {
        // Handle image drops
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          const file = event.dataTransfer.files[0];

          // Check if the dropped file is an image
          if (file.type.startsWith("image/")) {
            event.preventDefault();

            // Handle the image upload
            const handleImageDrop = async () => {
              try {
                const timestamp = Date.now();
                const randomId = Math.random().toString(36).substring(7);
                const publicId = `tiptap_image_${timestamp}_${randomId}`;

                const formData = new FormData();
                formData.append("file", file);
                formData.append("public_id", publicId);

                const response = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });

                if (response.ok) {
                  const data = await response.json();

                  // Insert the image at the drop position
                  const { pos } = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                  }) || { pos: 0 };

                  view.dispatch(
                    view.state.tr.insert(
                      pos,
                      view.state.schema.nodes.image.create({
                        src: data.url,
                        alt: file.name,
                        title: file.name,
                      })
                    )
                  );
                }
              } catch (error) {
                console.error("Drop image upload failed:", error);
              }
            };

            handleImageDrop();
            return true;
          }
        }
        return false;
      },
    },
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    content: removeFirstAndLastQuotes(content),
  });

  return (
    <div className="w-full p-4">
      <p className="text-lg uppercase">{name} :</p>
      <Toolbar editor={editor} content={removeFirstAndLastQuotes(content)} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} className="tiptap-editor" />

      {/* Add some basic styles for images */}
      <style jsx global>{`
        .tiptap-editor .tiptap-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 8px 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .tiptap-editor .ProseMirror {
          outline: none;
        }

        .tiptap-editor .ProseMirror img {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tiptap-editor .ProseMirror img:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .tiptap-editor .ProseMirror img.ProseMirror-selectednode {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Tiptap;
