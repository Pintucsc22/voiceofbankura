"use client";

import { useEffect, useState } from "react";

export default function ManageWeather() {
  const [weather, setWeather] = useState([]);

  async function loadWeather() {
    const res = await fetch("/api/weather");
    const data = await res.json();
    setWeather(data);
  }

  useEffect(() => {
    loadWeather();
  }, []);

  async function deleteWeather(id: string) {
    const ok = confirm("Are you sure you want to delete this weather update?");

    if (!ok) return;

    await fetch("/api/weather", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadWeather();
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Manage Weather
      </h1>

      <div className="space-y-4">

        {weather.map((item: any) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >

            <div>
              <h2 className="font-bold text-xl">
                📍 {item.city}
              </h2>

              <p className="text-gray-600">
                {item.temperature} • {item.condition}
              </p>

              <p className="text-sm text-gray-500">
                Humidity: {item.humidity} | Wind: {item.wind}
              </p>
            </div>

            <button
              onClick={() => deleteWeather(item._id)}
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