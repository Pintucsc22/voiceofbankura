"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WeatherPage() {

  const router = useRouter();

  const [city, setCity] = useState("Bankura");
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("vob_admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      const formData = new FormData();

      formData.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      imageUrl = uploadData.imageUrl;
    }

    await fetch("/api/weather", {
      method: "POST",
      body: JSON.stringify({
        city,
        temperature,
        condition,
        humidity,
        wind,
        image: imageUrl,
      }),
    });

    alert("Weather Added");

    setTemperature("");
    setCondition("");
    setHumidity("");
    setWind("");
  };

  return (
    <div className="max-w-2xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-5">
        Weather Update
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          className="border p-3 w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Humidity"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Wind Speed"
          value={wind}
          onChange={(e) => setWind(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
        />

        <button
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Save Weather
        </button>

      </form>

    </div>
  );
}