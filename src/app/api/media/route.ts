import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  youtubeLink: String,
  facebookLink: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Media =
  mongoose.models.Media || mongoose.model("Media", MediaSchema);

// GET media
export async function GET() {
  await connectDB();

  const media = await Media.find().sort({ _id: -1 });

  return Response.json(media);
}

// POST media
export async function POST(req: Request) {

  const body = await req.json();

  await connectDB();

  const media = await Media.create({
    youtubeLink: body.youtubeLink,
    facebookLink: body.facebookLink,
  });

  return Response.json(media);
}