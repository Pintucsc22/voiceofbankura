
"use client";

import { useEffect, useState } from "react";

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

type RashifalItem = {
  _id: string;
  zodiac: string;
  content?: string;
  date?: string;
  bengaliDate?: string;
};

function formatEnglishDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export default function ManageRashifal() {
  const [items, setItems] = useState<RashifalItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingZodiac, setEditingZodiac] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [editingBengaliDate, setEditingBengaliDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadRashifal() {
    try {
      const res = await fetch("/api/rashifal", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load Rashifal");
      }

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Load Rashifal error:", error);
      alert("রাশিফলের তালিকা লোড করা যায়নি।");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRashifal();
  }, []);

  function startEdit(item: RashifalItem) {
    setEditingId(item._id);
    setEditingZodiac(item.zodiac || "");
    setEditingContent(item.content || "");
    setEditingBengaliDate(item.bengaliDate || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingZodiac("");
    setEditingContent("");
    setEditingBengaliDate("");
  }

  async function updateRashifal() {
    if (!editingId) return;

    if (!editingContent.trim()) {
      alert("রাশিফলের লেখা লিখুন।");
      return;
    }

    if (!editingBengaliDate.trim()) {
      alert("বেনীমাধব শীলের পঞ্জিকা অনুযায়ী বাংলা তারিখ লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/rashifal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingId,
          zodiac: editingZodiac,
          content: editingContent.trim(),
          bengaliDate: editingBengaliDate.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.error || "Rashifal update failed"
        );
      }

      alert("রাশিফল ও বাংলা তারিখ আপডেট হয়েছে।");

      cancelEdit();
      await loadRashifal();
    } catch (error) {
      console.error("Update Rashifal error:", error);
      alert("রাশিফল আপডেট করা যায়নি।");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRashifal(id: string) {
    const confirmed = window.confirm(
      "আপনি কি এই রাশিফলটি মুছে ফেলতে চান?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch("/api/rashifal", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      if (editingId === id) {
        cancelEdit();
      }

      await loadRashifal();
      alert("রাশিফল মুছে ফেলা হয়েছে।");
    } catch (error) {
      console.error("Delete Rashifal error:", error);
      alert("রাশিফল মুছে ফেলা যায়নি।");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-5">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-6">
          <p className="text-sm font-bold text-purple-600">
            DAILY RASHIFAL
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            রাশিফল পরিচালনা
          </h1>

          <p className="mt-2 text-gray-500">
            ১২টি রাশির ভবিষ্যৎবাণী ও বাংলা পঞ্জিকার তারিখ পরিচালনা করুন।
          </p>
        </header>

        {/* Edit form */}
        {editingId && (
          <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              রাশিফল সম্পাদনা
            </h2>

            <div className="mb-5">
              <label className="mb-2 block font-semibold text-gray-800">
                রাশি
              </label>

              <div className="rounded-xl border bg-gray-50 p-3 font-semibold">
                {zodiacNames[editingZodiac] || editingZodiac}
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-2 block font-semibold text-gray-800">
                বাংলা তারিখ (বেনীমাধব শীলের পঞ্জিকা)
              </label>

              <input
                type="text"
                value={editingBengaliDate}
                onChange={(e) =>
                  setEditingBengaliDate(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-purple-500"
                placeholder="যেমন: ৪ কার্তিক ১৪৩৩ বঙ্গাব্দ"
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                পঞ্জিকা দেখে সঠিক বাংলা তারিখ লিখুন।
              </p>
            </div>

            <div className="mb-5">
              <label className="mb-2 block font-semibold text-gray-800">
                আজকের রাশিফল
              </label>

              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="min-h-[220px] w-full resize-y rounded-xl border border-gray-300 p-4 leading-7 outline-none focus:border-purple-500"
                placeholder="আজকের রাশিফল লিখুন..."
                required
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={updateRashifal}
                disabled={saving}
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                disabled={saving}
                className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100 disabled:opacity-60"
              >
                বাতিল
              </button>
            </div>
          </section>
        )}

        {/* Rashifal list */}
        {loading ? (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            রাশিফলের তালিকা লোড হচ্ছে...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            এখনও কোনো রাশিফল যোগ করা হয়নি।
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => {
              const bengaliName =
                zodiacNames[item.zodiac] || item.zodiac || "রাশিফল";

              const englishDate = formatEnglishDate(item.date);

              return (
                <article
                  key={item._id}
                  className="rounded-2xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-gray-900">
                        {bengaliName}
                      </h2>

                      <div className="mt-3 space-y-1 text-sm">
                        {englishDate && (
                          <p className="text-gray-500">
                            <span className="font-semibold text-gray-700">
                              English date:
                            </span>{" "}
                            {englishDate}
                          </p>
                        )}

                        {item.bengaliDate ? (
                          <p className="text-gray-500">
                            <span className="font-semibold text-gray-700">
                              বাংলা তারিখ:
                            </span>{" "}
                            {item.bengaliDate}
                          </p>
                        ) : (
                          <p className="text-amber-700">
                            বাংলা তারিখ যোগ করা হয়নি।
                          </p>
                        )}
                      </div>

                      <p className="mt-3 whitespace-pre-wrap break-words leading-7 text-gray-600">
                        {item.content || "আজকের রাশিফল লেখা নেই"}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteRashifal(item._id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}