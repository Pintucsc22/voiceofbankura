"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Category
  const [category, setCategory] = useState("Bankura");

  // YouTube
  const [video, setVideo] = useState("");

  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("vob_admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("শিরোনাম লিখুন");
      return;
    }

    if (!content.trim()) {
      alert("খবরের বিস্তারিত লিখুন");
      return;
    }

    setSaving(true);

    try {
      let imageUrl = "";

      // =========================
      // IMAGE UPLOAD
      // =========================
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = await uploadRes.json();

        imageUrl = uploadData.imageUrl || "";
      }

      // =========================
      // SAVE ARTICLE
      // =========================
      const articleRes = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          image: imageUrl,
          category,
          video: video.trim(),
        }),
      });

      if (!articleRes.ok) {
        throw new Error("Article save failed");
      }

      alert("খবর সফলভাবে প্রকাশ হয়েছে");

      // Reset
      setTitle("");
      setContent("");
      setImage(null);
      setCategory("Bankura");
      setVideo("");
    } catch (error) {
      console.error(error);
      alert("খবর প্রকাশ করা যায়নি");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="mx-auto max-w-2xl">

        {/* HEADER */}
        <div className="mb-6">
          <p className="text-sm font-bold text-red-600">
            VOICE OF BANKURA
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            নতুন খবর প্রকাশ করুন
          </h1>

          <p className="mt-2 text-gray-500">
            খবরের তথ্য পূরণ করে প্রকাশ করুন
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm"
        >

          {/* TITLE */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              খবরের শিরোনাম
            </label>

            <input
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-red-500"
              placeholder="খবরের শিরোনাম লিখুন"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              খবরের বিভাগ
            </label>

            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-red-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Bankura">
                বাঁকুড়া
              </option>

              <option value="State">
                রাজ্য
              </option>
            </select>
          </div>

          {/* CONTENT */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              খবরের বিস্তারিত
            </label>

            <textarea
              className="min-h-[220px] w-full resize-y rounded-xl border border-gray-300 p-4 leading-7 outline-none focus:border-red-500"
              placeholder="খবরের বিস্তারিত লিখুন..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              খবরের ছবি
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
              className="w-full rounded-xl border border-gray-300 p-3"
            />

            {image && (
              <p className="mt-2 text-sm text-gray-500">
                নির্বাচিত ছবি: {image.name}
              </p>
            )}
          </div>

          {/* YOUTUBE */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              YouTube ভিডিও লিংক
            </label>

            <input
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-red-500"
              placeholder="https://www.youtube.com/watch?v=..."
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />

            <p className="mt-2 text-xs text-gray-400">
              ভিডিও না থাকলে এই ঘরটি খালি রাখতে পারেন।
            </p>
          </div>

          {/* PUBLISH */}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "প্রকাশ হচ্ছে..."
              : "খবর প্রকাশ করুন"}
          </button>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("vob_admin");
              router.push("/admin/login");
            }}
            className="w-full rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}