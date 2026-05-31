import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  videoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video =
  mongoose.models.Video ||
  mongoose.model("Video", VideoSchema);

// GET
export async function GET() {
  await connectDB();

  const videos = await Video.find().sort({
    _id: -1,
  });

  return Response.json(videos);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  await connectDB();

  const video = await Video.create({
    title: body.title,
    thumbnail: body.thumbnail,
    videoUrl: body.videoUrl,
  });

  return Response.json(video);
}