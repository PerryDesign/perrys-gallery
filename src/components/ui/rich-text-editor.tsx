"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading2,
  Heading3,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-1 p-1 mb-1 border-b border-input bg-muted/40 rounded-t-md">
      <div className="flex flex-wrap gap-1 items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "h-8 px-2",
            editor.isActive("bold") ? "bg-accent text-accent-foreground" : ""
          )}
          type="button"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "h-8 px-2",
            editor.isActive("italic") ? "bg-accent text-accent-foreground" : ""
          )}
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <span className="w-px h-6 bg-border mx-1"></span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "h-8 px-2",
            editor.isActive("heading", { level: 2 })
              ? "bg-accent text-accent-foreground"
              : ""
          )}
          type="button"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            "h-8 px-2",
            editor.isActive("heading", { level: 3 })
              ? "bg-accent text-accent-foreground"
              : ""
          )}
          type="button"
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <span className="w-px h-6 bg-border mx-1"></span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "h-8 px-2",
            editor.isActive("bulletList")
              ? "bg-accent text-accent-foreground"
              : ""
          )}
          type="button"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "h-8 px-2",
            editor.isActive("orderedList")
              ? "bg-accent text-accent-foreground"
              : ""
          )}
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <span className="w-px h-6 bg-border mx-1"></span>

        <Button
          variant="ghost"
          size="sm"
          onClick={setLink}
          className={cn(
            "h-8 px-2",
            editor.isActive("link") ? "bg-accent text-accent-foreground" : ""
          )}
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={addImage}
          type="button"
          className="h-8 px-2"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <span className="w-px h-6 bg-border mx-1"></span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "h-8 px-2",
            editor.isActive({ textAlign: "left" })
              ? "bg-accent text-accent-foreground"
              : ""
          )}
          type="button"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "h-8 px-2",
            editor.isActive({ textAlign: "center" })
              ? "bg-accent text-accent-foreground"
              : ""
          )}
          type="button"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "h-8 px-2",
            editor.isActive({ textAlign: "right" })
              ? "bg-accent text-accent-foreground"
              : ""
          )}
          type="button"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <span className="w-px h-6 bg-border mx-1"></span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          type="button"
          className="h-8 px-2"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          type="button"
          className="h-8 px-2"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] p-3 focus:outline-none prose prose-sm max-w-none prose-headings:mb-2 prose-p:my-1 prose-img:my-0 dark:prose-invert dark:prose-headings:text-white dark:prose-a:text-blue-400",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Handle hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update content if value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "border border-input rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-ring",
        className
      )}
    >
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none dark:prose-invert"
      />
    </div>
  );
}
