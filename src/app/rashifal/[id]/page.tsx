import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const RashifalSchema = new mongoose.Schema({
  zodiac: String,
  image: String,
  content: String,
});

const Rashifal =
  mongoose.models.Rashifal ||
  mongoose.model("Rashifal", RashifalSchema);

async function getRashifal(id: string) {
  await connectDB();

  return await Rashifal.findById(id);
}

const zodiacMap: any = {
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

export default async function RashifalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const item = await getRashifal(id);

  if (!item) {
    return <div>Not Found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-5xl mx-auto">

        {item.image && (
          <img
            src={item.image}
            className="w-full h-auto rounded-3xl"
          />
        )}

        <div className="bg-white p-8 shadow-xl -mt-10 relative rounded-3xl">

          <div className="text-6xl mb-4">
            {zodiacMap[item.zodiac]?.split(" ")[0]}
          </div>

          <h1 className="
            text-4xl
            md:text-5xl
            font-extrabold
            mb-6
          ">
            {zodiacMap[item.zodiac]}
          </h1>

          <div className="
            text-lg
            leading-9
            text-gray-700
          ">
            {item.content}
          </div>

        </div>

      </div>

    </div>
  );
}