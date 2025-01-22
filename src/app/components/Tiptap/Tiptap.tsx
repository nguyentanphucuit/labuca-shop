"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import { removeFirstAndLastQuotes } from "@/app/constants/common";

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
    extensions: [StarterKit, Underline, ImageResize],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l  border-gray-700",
      },
    },
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    content: content.slice(1, -1),
  });

  return (
    <div className="w-full p-4">
      <p className="text-lg uppercase">{name} :</p>
      <Toolbar editor={editor} content={removeFirstAndLastQuotes(content)} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
