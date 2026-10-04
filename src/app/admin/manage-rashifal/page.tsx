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

export default function ManageRashifal() {
  const [items, setItems] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingZodiac, setEditingZodiac] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadRashifal() {
    try {
      const res = await fetch("/api/rashifal", {
        cache: "no-store",
      });

      const data = await res.json();

      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setItems([]);
    }
  }

  useEffect(() => {
    loadRashifal();
  }, []);

  function startEdit(item: any) {
    setEditingId(item._id);
    setEditingZodiac(item.zodiac);
    setEditingContent(item.content || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingZodiac("");
    setEditingContent("");
  }

  async function updateRashifal() {
    if (!editingId) return;

    if (!editingContent.trim()) {
      alert("রাশিফলের লেখা লিখুন");
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
        }),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("রাশিফল আপডেট হয়েছে");

      cancelEdit();
      await loadRashifal();
    } catch (error) {
      console.error(error);
      alert("রাশিফল আপডেট করা যায়নি");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRashifal(id: string) {
    const ok = confirm(
      "আপনি কি এই রাশিফলটি মুছে ফেলতে চান?"
    );

    if (!ok) return;

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

      await loadRashifal();
    } catch (error) {
      console.error(error);
      alert("রাশিফল মুছে ফেলা যায়নি");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-bold text-purple-600">
            DAILY RASHIFAL
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            রাশিফল পরিচালনা
          </h1>

          <p className="mt-2 text-gray-500">
            ১২টি রাশির দৈনিক ভবিষ্যৎবাণী পরিচালনা করুন
          </p>
        </div>

        {/* Edit Box */}
        {editingId && (
          <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">
              রাশিফল সম্পাদনা
            </h2>

            <div className="mb-4">
              <label className="mb-2 block font-semibold">
                রাশি
              </label>

              <div className="rounded-xl border bg-gray-50 p-3 font-semibold">
                {zodiacNames[editingZodiac] || editingZodiac}
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-semibold">
                আজকের রাশিফল
              </label>

              <textarea
                value={editingContent}
                onChange={(e) =>
                  setEditingContent(e.target.value)
                }
                className="min-h-[220px] w-full resize-y rounded-xl border p-4 leading-7 outline-none focus:border-purple-500"
                placeholder="আজকের রাশিফল লিখুন..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={updateRashifal}
                disabled={saving}
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
              >
                {saving
                  ? "আপডেট হচ্ছে..."
                  : "আপডেট করুন"}
              </button>

              <button
                onClick={cancelEdit}
                disabled={saving}
                className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
              >
                বাতিল
              </button>
            </div>
          </div>
        )}

        {/* Rashifal List */}
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => {
            const bengaliName =
              zodiacNames[item.zodiac] || item.zodiac;

            return (
              <div
                key={item._id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">
                    <h2 className="text-xl font-bold">
                      {bengaliName}
                    </h2>

                    <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
                      {item.content ||
                        "আজকের রাশিফল লেখা নেই"}
                    </p>

                    {item.date && (
                      <p className="mt-3 text-xs text-gray-400">
                        {new Date(
                          item.date
                        ).toLocaleDateString("bn-BD")}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteRashifal(item._id)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            এখনও কোনো রাশিফল যোগ করা হয়নি।
          </div>
        )}

      </div>
    </div>
  );
}