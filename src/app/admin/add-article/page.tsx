"use client";

import { useState } from "react";

export default function AddArticle() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    alert("Article Added!");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Add Article</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          className="border p-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-black text-white p-2 ml-2">
          Submit
        </button>
      </form>
    </div>
  );
}