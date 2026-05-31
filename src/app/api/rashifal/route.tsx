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
});

const Rashifal =
  mongoose.models.Rashifal ||
  mongoose.model("Rashifal", RashifalSchema);

// GET
export async function GET() {
  await connectDB();

  const rashifals = await Rashifal.find().sort({
    _id: -1,
  });

  return Response.json(rashifals);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  await connectDB();

  const rashifal = await Rashifal.create({
    zodiac: body.zodiac,
    image: body.image,
    content: body.content,
  });

  return Response.json(rashifal);
}