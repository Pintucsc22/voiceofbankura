"use client";

import { useState } from "react";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({ title, content, image }),
    });

    alert("Article Added!");

    // clear form
    setTitle("");
    setContent("");
    setImage("");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Add Article</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        
        {/* Title */}
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content */}
        <textarea
          className="border p-2 w-full"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Image */}
        <input
          className="border p-2 w-full"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="bg-black text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
}