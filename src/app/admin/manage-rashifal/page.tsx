"use client";

import { useEffect, useState } from "react";

export default function ManageRashifal() {
  const [items, setItems] = useState([]);

  async function loadRashifal() {
    const res = await fetch("/api/rashifal");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    loadRashifal();
  }, []);

  async function deleteRashifal(id: string) {
    const ok = confirm("Are you sure you want to delete this Rashifal?");

    if (!ok) return;

    await fetch("/api/rashifal", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadRashifal();
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Manage Rashifal
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        {items.map((item: any) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >

            <div className="flex items-center gap-4">

              {item.image && (
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded-xl"
                />
              )}

              <div>
                <h2 className="font-bold text-lg">
                  {item.rashi || item.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  {item.date || ""}
                </p>
              </div>

            </div>

            <button
              onClick={() => deleteRashifal(item._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}