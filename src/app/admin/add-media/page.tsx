"use client";

import { useState } from "react";

export default function AddMedia() {

  const [youtubeLink, setYoutubeLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/media", {
      method: "POST",
      body: JSON.stringify({
        youtubeLink,
        facebookLink,
      }),
    });

    alert("Media Added!");

    setYoutubeLink("");
    setFacebookLink("");
  };

  return (
    <div className="max-w-2xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Add Media
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* YouTube */}
        <input
          type="text"
          placeholder="YouTube Video Link"
          className="border p-3 w-full rounded"
          value={youtubeLink}
          onChange={(e) =>
            setYoutubeLink(e.target.value)
          }
        />

        {/* Facebook */}
        <input
          type="text"
          placeholder="Facebook Video Link"
          className="border p-3 w-full rounded"
          value={facebookLink}
          onChange={(e) =>
            setFacebookLink(e.target.value)
          }
        />

        <button className="bg-red-700 text-white px-6 py-3 rounded">
          Save Media
        </button>

      </form>
    </div>
  );
}