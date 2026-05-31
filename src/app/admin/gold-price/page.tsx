"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoldPricePage() {

  const router = useRouter();

  const [gold24k, setGold24k] = useState("");
  const [gold22k, setGold22k] = useState("");
  const [silver, setSilver] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("vob_admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/gold-price", {
      method: "POST",
      body: JSON.stringify({
        gold24k,
        gold22k,
        silver,
      }),
    });

    alert("Gold Price Updated");

    setGold24k("");
    setGold22k("");
    setSilver("");
  };

  return (
    <div className="max-w-2xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-5">
        Gold Price Update
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          className="border p-3 w-full"
          placeholder="24K Gold Price"
          value={gold24k}
          onChange={(e) => setGold24k(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="22K Gold Price"
          value={gold22k}
          onChange={(e) => setGold22k(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Silver Price"
          value={silver}
          onChange={(e) => setSilver(e.target.value)}
        />

        <button
          className="
            bg-yellow-600
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Save Price
        </button>

      </form>

    </div>
  );
}