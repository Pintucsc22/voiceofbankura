import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

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

async function getRashifal(id: string) {
  await connectDB();
  return Rashifal.findById(id).lean();
}

export default async function RashifalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getRashifal(id);

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            রাশিফল পাওয়া যায়নি
          </h1>
          <p className="mt-3 text-gray-600">
            এই রাশিফলটি পাওয়া যাচ্ছে না অথবা মুছে ফেলা হয়েছে।
          </p>
        </div>
      </main>
    );
  }

  const zodiac =
    (item.zodiac && zodiacMap[item.zodiac]) || {
      symbol: "🔮",
      name: item.zodiac || "রাশিফল",
    };

  const englishDate = item.date
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(new Date(item.date))
    : "";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <article className="mx-auto max-w-4xl">
        {item.image && (
          <img
            src={item.image}
            alt={`${zodiac.name} রাশিফল`}
            className="mb-6 max-h-[450px] w-full rounded-3xl object-cover"
          />
        )}

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-4 text-5xl">{zodiac.symbol}</div>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {zodiac.name} রাশিফল
          </h1>

          <div className="mt-5 flex flex-wrap gap-3">
            {englishDate && (
              <div className="rounded-xl bg-blue-50 px-4 py-3">
                <p className="text-xs font-semibold text-blue-700">
                  ENGLISH DATE
                </p>
                <p className="mt-1 font-semibold text-gray-800">
                  {englishDate}
                </p>
              </div>
            )}

            {item.bengaliDate && (
              <div className="rounded-xl bg-purple-50 px-4 py-3">
                <p className="text-xs font-semibold text-purple-700">
                  বাংলা তারিখ
                </p>
                <p className="mt-1 font-semibold text-gray-800">
                  {item.bengaliDate}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 whitespace-pre-wrap break-words text-lg leading-9 text-gray-700">
            {item.content}
          </div>
        </div>
      </article>
    </main>
  );
}