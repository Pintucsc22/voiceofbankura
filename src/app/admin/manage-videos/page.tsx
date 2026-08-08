"use client";

import { useEffect, useState } from "react";

export default function ManageVideos() {
  const [videos, setVideos] = useState([]);

  async function loadVideos() {
    const res = await fetch("/api/videos");
    const data = await res.json();
    setVideos(data);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function deleteVideo(id: string) {
    const ok = confirm("Are you sure you want to delete this video?");

    if (!ok) return;

    await fetch("/api/videos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadVideos();
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Manage Videos
      </h1>

      <div className="space-y-4">

        {videos.map((item: any) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center gap-4"
          >

            <div className="flex items-center gap-4">

              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  className="w-24 h-16 object-cover rounded-lg"
                />
              )}

              <div>
                <h2 className="font-bold">
                  {item.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  {item.videoUrl}
                </p>
              </div>

            </div>

            <button
              onClick={() => deleteVideo(item._id)}
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