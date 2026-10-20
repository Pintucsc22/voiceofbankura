
import { connectDB } from "../../lib/db";
import mongoose from "mongoose";
import Link from "next/link";

export const dynamic = "force-dynamic";

const GoldPriceSchema = new mongoose.Schema({
  gold24k: String,
  gold22k: String,
  silver: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GoldPrice =
  mongoose.models.GoldPrice ||
  mongoose.model("GoldPrice", GoldPriceSchema);

async function getLatestGoldPrice() {
  try {
    await connectDB();

    const price = await GoldPrice.findOne()
      .sort({ _id: -1 })
      .lean();

    if (!price) return null;

    return {
      gold24k: price.gold24k || "",
      gold22k: price.gold22k || "",
      silver: price.silver || "",
      createdAt: price.createdAt
        ? new Date(price.createdAt).toISOString()
        : null,
    };
  } catch (error) {
    console.error("Failed to load gold prices:", error);
    return null;
  }
}

function formatDate(date: string | null) {
  if (!date) return "তারিখ পাওয়া যায়নি";

  return new Intl.DateTimeFormat("bn-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

export default async function GoldPricePage() {
  const price = await getLatestGoldPrice();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-block text-sm font-medium text-blue-700 hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>

          <h1 className="text-3xl font-bold sm:text-4xl">
            আজকের সোনা ও রূপার দাম
          </h1>

          <p className="mt-3 text-gray-600">
            বাঁকুড়া ও আশপাশের এলাকার পাঠকদের জন্য সোনা ও রূপার দামের তথ্য।
          </p>
        </div>

        {!price ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              দামের তথ্য এখন পাওয়া যাচ্ছে না
            </h2>
            <p className="mt-2 text-gray-600">
              অনুগ্রহ করে পরে আবার চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <section className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">🪙</span>
                  <div>
                    <h2 className="text-lg font-bold">২৪ ক্যারেট সোনা</h2>
                    <p className="text-sm text-gray-500">বিশুদ্ধ সোনা</p>
                  </div>
                </div>

                <p className="text-3xl font-bold text-yellow-700">
                  {price.gold24k ? `₹${price.gold24k}` : "তথ্য নেই"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  প্রতি ১০ গ্রাম কিনা, প্রশাসকের দেওয়া দামের একক অনুযায়ী যাচাই করুন।
                </p>
              </section>

              <section className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">💍</span>
                  <div>
                    <h2 className="text-lg font-bold">২২ ক্যারেট সোনা</h2>
                    <p className="text-sm text-gray-500">গয়নার সোনা</p>
                  </div>
                </div>

                <p className="text-3xl font-bold text-yellow-700">
                  {price.gold22k ? `₹${price.gold22k}` : "তথ্য নেই"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  কেনার আগে স্থানীয় দোকানে দাম যাচাই করুন।
                </p>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">🥈</span>
                  <div>
                    <h2 className="text-lg font-bold">রূপা</h2>
                    <p className="text-sm text-gray-500">রূপার বর্তমান দর</p>
                  </div>
                </div>

                <p className="text-3xl font-bold text-gray-700">
                  {price.silver ? `₹${price.silver}` : "তথ্য নেই"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  রূপার দামের একক প্রশাসকের দেওয়া তথ্য অনুযায়ী।
                </p>
              </section>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-600">
                <strong>সর্বশেষ আপডেট:</strong>{" "}
                {formatDate(price.createdAt)}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                প্রদর্শিত দাম প্রশাসকের আপডেট করা তথ্যের ভিত্তিতে দেখানো হচ্ছে।
                প্রকৃত বাজারদর, জিএসটি, মজুরি ও দোকানভেদে দাম আলাদা হতে পারে।
                কেনার আগে বিক্রেতার কাছ থেকে নিশ্চিত হয়ে নিন।
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}