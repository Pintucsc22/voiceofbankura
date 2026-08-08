import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

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

// GET
export async function GET() {
  await connectDB();

  const weather = await Weather.find().sort({
    _id: -1,
  });

  return Response.json(weather);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  await connectDB();

  const weather = await Weather.create({
    city: body.city,
    temperature: body.temperature,
    condition: body.condition,
    humidity: body.humidity,
    wind: body.wind,
    image: body.image,
  });

  return Response.json(weather);
}
// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await connectDB();

  await Weather.findByIdAndDelete(id);

  return Response.json({
    success: true,
  });
}