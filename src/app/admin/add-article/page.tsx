"use client";

import { useState } from "react";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("Bankura News");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl = "";

    // upload image first
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      imageUrl = uploadData.imageUrl;
    }

    // save article
    await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        image: imageUrl,
        category,
      }),
    });

    alert("Article Added!");

    setTitle("");
    setContent("");
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">
        Add Article
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Title */}
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content */}
        <textarea
          className="border p-2 w-full h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option>Bankura News</option>
          <option>State News</option>
          <option>Rashifal</option>
          <option>Weather</option>
          <option>Gold Price</option>
          <option>Sports</option>
          <option>Entertainment</option>

        </select>

        {/* Image Upload */}
        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
        />

        <button className="bg-black text-white px-5 py-2 rounded">
          Publish Article
        </button>
      </form>
    </div>
  );
}