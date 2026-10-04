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
  try {
    const body = await req.json();

    await connectDB();

    const existing = await Rashifal.findOne({
      zodiac: body.zodiac,
    }).sort({ date: -1, _id: -1 });

    if (existing) {
      existing.content = body.content;
      existing.date = new Date();

      await existing.save();

      return Response.json(existing);
    }

    const rashifal = await Rashifal.create({
      zodiac: body.zodiac,
      content: body.content,
      image: "",
      date: new Date(),
    });

    return Response.json(rashifal);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to save Rashifal" },
      { status: 500 }
    );
  }
}
// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await connectDB();

  await Rashifal.findByIdAndDelete(id);

  return Response.json({
    success: true,
  });
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const updated = await Rashifal.findByIdAndUpdate(
      body.id,
      {
        zodiac: body.zodiac,
        content: body.content,
      },
      {
        new: true,
      }
    );

    if (!updated) {
      return Response.json(
        { error: "Rashifal not found" },
        { status: 404 }
      );
    }

    return Response.json(updated);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to update Rashifal" },
      { status: 500 }
    );
  }
}