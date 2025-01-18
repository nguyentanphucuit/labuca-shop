import React, { useCallback } from "react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  ImagePlus,
} from "lucide-react";
import { ToolbarProps } from "../../types/common";

const Toolbar = ({ editor }: ToolbarProps) => {
  const addImage = useCallback(() => {
    const url = window.prompt("URL") || "";
    editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);
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
      icon: <ImagePlus className="w-5 h-5" />,
      handleClick: addImage,
    },
  ];
  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/20 flex-wrap">
        {listToolbar.map((item) => (
          <button
            key={item.name}
            onClick={(e) => {
              e.preventDefault();
              item.handleClick();
            }}
            className={
              editor.isActive(
                item.name,
                item.name === "heading" && { level: 2 }
              )
                ? "bg-sky-700 text-white p-2 rounded-lg"
                : "text-sky-400"
            }>
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
