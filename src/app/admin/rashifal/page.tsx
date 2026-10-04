"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const zodiacNames: Record<string, string> = {
  Aries: "মেষ",
  Taurus: "বৃষ",
  Gemini: "মিথুন",
  Cancer: "কর্কট",
  Leo: "সিংহ",
  Virgo: "কন্যা",
  Libra: "তুলা",
  Scorpio: "বৃশ্চিক",
  Sagittarius: "ধনু",
  Capricorn: "মকর",
  Aquarius: "কুম্ভ",
  Pisces: "মীন",
};

export default function RashifalPage() {
  const router = useRouter();

  const [zodiac, setZodiac] = useState("Aries");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("vob_admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("রাশিফলের লেখা লিখুন");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/rashifal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          zodiac,
          content: content.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save Rashifal");
      }

      alert(`${zodiacNames[zodiac]} রাশিফল সংরক্ষণ হয়েছে`);

      setContent("");
    } catch (error) {
      console.error(error);
      alert("রাশিফল সংরক্ষণ করা যায়নি");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-sm font-bold text-purple-600">
            DAILY RASHIFAL
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            আজকের রাশিফল
          </h1>

          <p className="mt-2 text-gray-500">
            প্রতিটি রাশির জন্য আজকের ভবিষ্যৎবাণী লিখুন
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm border"
        >
          {/* Zodiac */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              রাশি নির্বাচন করুন
            </label>

            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-purple-500"
              value={zodiac}
              onChange={(e) => setZodiac(e.target.value)}
            >
              {Object.entries(zodiacNames).map(
                ([english, bengali]) => (
                  <option key={english} value={english}>
                    {bengali}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Prediction */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              আজকের রাশিফল
            </label>

            <textarea
              className="min-h-[220px] w-full resize-y rounded-xl border border-gray-300 p-4 leading-7 outline-none focus:border-purple-500"
              placeholder="আজকের রাশিফল এখানে লিখুন..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <p className="mt-2 text-xs text-gray-400">
              বাংলা ভাষায় বিস্তারিত ভবিষ্যৎবাণী লিখতে পারেন।
            </p>
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "সংরক্ষণ হচ্ছে..." : "রাশিফল সংরক্ষণ করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}