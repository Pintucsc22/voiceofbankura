"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RashifalPage() {
  const router = useRouter();

  const [zodiac, setZodiac] = useState("Aries");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("vob_admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl = "";

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

    await fetch("/api/rashifal", {
      method: "POST",
      body: JSON.stringify({
        zodiac,
        content,
        image: imageUrl,
      }),
    });

    alert("Rashifal Added");

    setContent("");
    setImage(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-5">
        Daily Rashifal
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <select
          className="border p-3 w-full"
          value={zodiac}
          onChange={(e) => setZodiac(e.target.value)}
        >
          <option>Aries</option>
          <option>Taurus</option>
          <option>Gemini</option>
          <option>Cancer</option>
          <option>Leo</option>
          <option>Virgo</option>
          <option>Libra</option>
          <option>Scorpio</option>
          <option>Sagittarius</option>
          <option>Capricorn</option>
          <option>Aquarius</option>
          <option>Pisces</option>
        </select>

        <textarea
          className="border p-3 w-full h-40"
          placeholder="Today's Rashifal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
        />

        <button
          className="bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          Save Rashifal
        </button>

      </form>

    </div>
  );
}