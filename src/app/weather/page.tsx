
import { connectDB } from "../../lib/db";
import mongoose from "mongoose";
import Link from "next/link";

export const dynamic = "force-dynamic";

const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: String,
  condition: String,
  humidity: String,
  wind: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Weather =
  mongoose.models.Weather ||
  mongoose.model("Weather", WeatherSchema);

async function getWeather() {
  try {
    await connectDB();

    const records = await Weather.find()
      .sort({ _id: -1 })
      .lean();

    return records.map((item) => ({
      id: String(item._id),
      city: item.city || "বাঁকুড়া",
      temperature: item.temperature || "",
      condition: item.condition || "",
      humidity: item.humidity || "",
      wind: item.wind || "",
      image: item.image || "",
      createdAt: item.createdAt
        ? new Date(item.createdAt).toISOString()
        : null,
    }));
  } catch (error) {
    console.error("Failed to load weather:", error);
    return [];
  }
}

function formatDate(date: string | null) {
  if (!date) return "তারিখ পাওয়া যায়নি";

  return new Intl.DateTimeFormat("bn-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

function getWeatherIcon(condition: string) {
  const value = condition.toLowerCase();

  if (
    value.includes("rain") ||
    value.includes("বৃষ্টি")
  ) {
    return "🌧️";
  }

  if (
    value.includes("cloud") ||
    value.includes("মেঘ")
  ) {
    return "☁️";
  }

  if (
    value.includes("storm") ||
    value.includes("ঝড়")
  ) {
    return "⛈️";
  }

  if (
    value.includes("fog") ||
    value.includes("কুয়াশা")
  ) {
    return "🌫️";
  }

  if (
    value.includes("sun") ||
    value.includes("clear") ||
    value.includes("রোদ") ||
    value.includes("পরিষ্কার")
  ) {
    return "☀️";
  }

  return "🌤️";
}

export default async function WeatherPage() {
  const weather = await getWeather();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-5 inline-block text-sm font-medium text-blue-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">
            আজকের আবহাওয়া
          </h1>

          <p className="mt-3 text-gray-600">
            বাঁকুড়া ও অন্যান্য এলাকার আবহাওয়ার সর্বশেষ প্রকাশিত তথ্য।
          </p>
        </div>

        {weather.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mb-3 text-5xl">🌤️</div>
            <h2 className="text-xl font-bold">
              আবহাওয়ার তথ্য এখন পাওয়া যাচ্ছে না
            </h2>
            <p className="mt-2 text-gray-600">
              অ্যাডমিন প্যানেল থেকে আবহাওয়ার তথ্য যোগ করুন অথবা পরে আবার চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {weather.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={`${item.city} আবহাওয়া`}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        আবহাওয়ার রিপোর্ট
                      </p>
                      <h2 className="mt-1 text-2xl font-bold">
                        {item.city}
                      </h2>
                    </div>

                    <span
                      className="text-4xl"
                      aria-hidden="true"
                    >
                      {getWeatherIcon(item.condition)}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="text-4xl font-bold text-blue-700">
                      {item.temperature
                        ? `${item.temperature}${/°|ডিগ্রি/i.test(item.temperature) ? "" : "°C"}`
                        : "তথ্য নেই"}
                    </p>

                    <p className="mt-2 text-lg text-gray-700">
                      {item.condition || "আবহাওয়ার অবস্থা উল্লেখ করা হয়নি"}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-sm text-gray-600">
                        আর্দ্রতা
                      </p>
                      <p className="mt-1 text-lg font-bold">
                        {item.humidity || "—"}
                        {item.humidity &&
                        !item.humidity.includes("%")
                          ? "%"
                          : ""}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-100 p-4">
                      <p className="text-sm text-gray-600">
                        বাতাসের গতি
                      </p>
                      <p className="mt-1 text-lg font-bold">
                        {item.wind || "—"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs text-gray-500">
                    সর্বশেষ আপডেট: {formatDate(item.createdAt)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-8 text-sm leading-6 text-gray-500">
          নোট: এখানে অ্যাডমিন প্যানেলে সংরক্ষিত আবহাওয়ার তথ্য দেখানো হয়।
          এটি স্বয়ংক্রিয় লাইভ আবহাওয়ার পূর্বাভাস নয়।
        </p>
      </div>
    </main>
  );
}