"use client";

import { useEffect, useState } from "react";

export default function ManageNews() {
  const [articles, setArticles] = useState([]);

  async function loadArticles() {
    const res = await fetch("/api/articles");
    const data = await res.json();

    setArticles(data);
  }

  useEffect(() => {
    loadArticles();
  }, []);

  async function deleteArticle(id: string) {
    const ok = confirm(
      "Are you sure you want to delete this news?"
    );

    if (!ok) return;

    await fetch("/api/articles", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadArticles();
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Manage News
      </h1>

      <div className="space-y-4">

        {articles.map((item: any) => (

          <div
            key={item._id}
            className="
              bg-white
              p-4
              rounded-xl
              shadow
              flex
              justify-between
              items-center
            "
          >

            <div>
              <h2 className="font-bold">
                {item.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {item.category}
              </p>
            </div>

            <button
              onClick={() =>
                deleteArticle(item._id)
              }
              className="
                bg-red-600
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}
