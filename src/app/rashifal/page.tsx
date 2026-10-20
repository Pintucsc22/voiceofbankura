import { connectDB } from "../../lib/db";
import mongoose from "mongoose";
import Link from "next/link";

const RashifalSchema = new mongoose.Schema({
  zodiac: String,
  image: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  bengaliDate: {
    type: String,
    default: "",
  },
});

const Rashifal =
  mongoose.models.Rashifal ||
  mongoose.model("Rashifal", RashifalSchema);

const zodiacMap: Record<string, { symbol: string; name: string }> = {
  Aries: { symbol: "♈", name: "মেষ" },
  Taurus: { symbol: "♉", name: "বৃষ" },
  Gemini: { symbol: "♊", name: "মিথুন" },
  Cancer: { symbol: "♋", name: "কর্কট" },
  Leo: { symbol: "♌", name: "সিংহ" },
  Virgo: { symbol: "♍", name: "কন্যা" },
  Libra: { symbol: "♎", name: "তুলা" },
  Scorpio: { symbol: "♏", name: "বৃশ্চিক" },
  Sagittarius: { symbol: "♐", name: "ধনু" },
  Capricorn: { symbol: "♑", name: "মকর" },
  Aquarius: { symbol: "♒", name: "কুম্ভ" },
  Pisces: { symbol: "♓", name: "মীন" },
};

async function getRashifal() {
  await connectDB();

  return Rashifal.find()
    .sort({ _id: -1 })
    .lean();
}

function formatEnglishDate(dateValue: unknown): string {
  if (!dateValue) return "";

  const date = new Date(dateValue as string | number | Date);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export default async function RashifalPage() {
  const items = await getRashifal();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 text-center text-3xl font-extrabold md:text-5xl">
          আজকের রাশিফল
        </h1>

        <p className="mb-10 text-center text-gray-600">
          আপনার রাশির আজকের ভবিষ্যৎ জানুন
        </p>

        {items.length === 0 ? (
          <p className="py-12 text-center text-gray-600">
            বর্তমানে কোনো রাশিফল প্রকাশিত হয়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any) => {
              const zodiac = zodiacMap[item.zodiac] || {
                symbol: "🔮",
                name: item.zodiac || "রাশিফল",
              };

              const englishDate = formatEnglishDate(item.date);

              return (
                <Link
                  key={String(item._id)}
                  href={`/rashifal/${item._id}`}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">
                      {zodiac.symbol}
                    </span>

                    <h2 className="text-2xl font-bold text-gray-900">
                      {zodiac.name}
                    </h2>
                  </div>

                  <div className="mb-4 space-y-2 rounded-xl bg-gray-50 p-3">
                    {englishDate && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">
                          English:
                        </span>{" "}
                        {englishDate}
                      </p>
                    )}

                    {item.bengaliDate && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">
                          বাংলা তারিখ:
                        </span>{" "}
                        {item.bengaliDate}
                      </p>
                    )}
                  </div>

                  <p className="line-clamp-3 leading-7 text-gray-600">
                    {item.content || "এই রাশির ভবিষ্যৎবাণী শীঘ্রই প্রকাশিত হবে।"}
                  </p>

                  <span className="mt-4 inline-block font-semibold text-blue-600">
                    বিস্তারিত পড়ুন →
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}