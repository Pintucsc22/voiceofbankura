"use client";

import { useEffect, useState } from "react";

export default function ManageGoldPrice() {
  const [prices, setPrices] = useState([]);

  async function loadPrices() {
    const res = await fetch("/api/gold-price");
    const data = await res.json();
    setPrices(data);
  }

  useEffect(() => {
    loadPrices();
  }, []);

  async function deletePrice(id: string) {
    const ok = confirm("Are you sure you want to delete this gold price update?");

    if (!ok) return;

    await fetch("/api/gold-price", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadPrices();
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Manage Gold Price
      </h1>

      <div className="space-y-4">

        {prices.map((item: any) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >

            <div>

              <h2 className="font-bold text-xl">
                🥇 Gold Price
              </h2>

              <p>
                24K: {item.gold24k}
              </p>

              <p>
                22K: {item.gold22k}
              </p>

              <p>
                Silver: {item.silver}
              </p>

            </div>

            <button
              onClick={() => deletePrice(item._id)}
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