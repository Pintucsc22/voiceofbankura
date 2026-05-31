"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VideosPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("vob_admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let thumbnailUrl = "";

    if (image) {

      const formData = new FormData();

      formData.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      thumbnailUrl = uploadData.imageUrl;
    }

    await fetch("/api/videos", {
      method: "POST",
      body: JSON.stringify({
        title,
        thumbnail: thumbnailUrl,
        videoUrl,
      }),
    });

    alert("Video Added");

    setTitle("");
    setVideoUrl("");
  };

  return (
    <div className="max-w-2xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-5">
        Add Video News
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          className="border p-3 w-full"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="YouTube/Facebook Link"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
        />

        <button
          className="
            bg-red-600
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Save Video
        </button>

      </form>

    </div>
  );
}