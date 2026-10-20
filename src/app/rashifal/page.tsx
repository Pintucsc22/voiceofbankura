
import { connectDB } from "../../lib/db";
import mongoose from "mongoose";
import Link from "next/link";

const RashifalSchema = new mongoose.Schema({
  zodiac: String,
  image: String,
  content: String,
});

const Rashifal =
  mongoose.models.Rashifal ||
  mongoose.model("Rashifal", RashifalSchema);

const zodiacMap: Record<string, string> = {
  Aries: "♈ মেষ",
  Taurus: "♉ বৃষ",
  Gemini: "♊ মিথুন",
  Cancer: "♋ কর্কট",
  Leo: "♌ সিংহ",
  Virgo: "♍ কন্যা",
  Libra: "♎ তুলা",
  Scorpio: "♏ বৃশ্চিক",
  Sagittarius: "♐ ধনু",
  Capricorn: "♑ মকর",
  Aquarius: "♒ কুম্ভ",
  Pisces: "♓ মীন",
};

async function getRashifal() {
  await connectDB();
  return Rashifal.find().sort({ _id: -1 }).lean();
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
            {items.map((item: any) => (
              <Link
                key={String(item._id)}
                href={`/rashifal/${item._id}`}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                

                <h2 className="mb-3 text-2xl font-bold">
                  {zodiacMap[item.zodiac] || item.zodiac || "রাশিফল"}
                </h2>

                <p className="line-clamp-3 leading-7 text-gray-600">
                  {item.content}
                </p>

                <span className="mt-4 inline-block font-semibold text-blue-600">
                  বিস্তারিত পড়ুন →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
