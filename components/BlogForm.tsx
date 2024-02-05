"use client";
import { useCallback, useState } from "react";
import { Editor, editorProps } from "novel";
import { Button } from "@/components/ui/button";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BlogForm() {
  const [blogTitle, setBlogTitle] = useState("");

  const [blogContent, setBlogContent] = useState("");

  const updateContent = useCallback((data: editorProps) => {
    setBlogContent(data.getJSON());
  }, []);

  const onSubmit = async () => {
    const req = await fetch("/api/blogs", { 
      method: 'POST', 
      headers: { 
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({ 
        title: blogTitle, 
        content: blogContent
      })
    })

    const response = req.json()
  };

  return (
    <>
      <div>
        <Label htmlFor="email">Title</Label>
        <Input type="email" placeholder="Email" value={blogTitle} onChange={(e) => { 
          setBlogTitle(e.target.value);
        }} className="mt-2"/>
      </div>
      <div className="mt-5">
        <Label htmlFor="email">Content</Label>
        <Editor
          editorProps={{}}
          onDebouncedUpdate={updateContent}
          defaultValue={blogContent}
          className="border rounded pb-8 mt-2"
          disableLocalStorage
        />
      </div>
      <div className="mt-4 text-right">
        <Button variant={"secondary"}>Cancel</Button>
        <Button className="ml-5" onClick={onSubmit}>
          <CheckIcon className="mr-2" />
          Save
        </Button>
      </div>
    </>
  );
}
