import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

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

// GET
export async function GET() {
  await connectDB();

  const prices = await GoldPrice.find().sort({
    _id: -1,
  });

  return Response.json(prices);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  await connectDB();

  const price = await GoldPrice.create({
    gold24k: body.gold24k,
    gold22k: body.gold22k,
    silver: body.silver,
  });

  return Response.json(price);
}