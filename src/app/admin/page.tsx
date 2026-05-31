"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("vob_admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, []);

  const cards = [
    {
      title: "📰 Add News",
      link: "/admin/add-article",
      color: "bg-red-600",
    },
    {
      title: "📺 Add Video",
      link: "/admin/videos",
      color: "bg-blue-600",
    },
    {
      title: "🔮 Rashifal",
      link: "/admin/rashifal",
      color: "bg-purple-600",
    },
    {
      title: "🌤 Weather",
      link: "/admin/weather",
      color: "bg-sky-600",
    },
    {
      title: "🥇 Gold Price",
      link: "/admin/gold-price",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Voice Of Bankura Admin
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {cards.map((card) => (

            <Link
              key={card.link}
              href={card.link}
            >
              <div
                className={`
                  ${card.color}
                  text-white
                  p-8
                  rounded-3xl
                  shadow-lg
                  hover:scale-105
                  transition
                  cursor-pointer
                `}
              >
                <h2 className="text-2xl font-bold">
                  {card.title}
                </h2>
              </div>
            </Link>

          ))}

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("vob_admin");
            router.push("/admin/login");
          }}
          className="
            mt-10
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}