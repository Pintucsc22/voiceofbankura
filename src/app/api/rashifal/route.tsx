
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

// Reuse the model only if its schema includes bengaliDate.
const cachedRashifal = mongoose.models.Rashifal;

  if (
    cachedRashifal &&
    !cachedRashifal.schema.path("bengaliDate")
  ) {
    delete mongoose.models.Rashifal;
  }

  const Rashifal =
    mongoose.models.Rashifal ||
    mongoose.model("Rashifal", RashifalSchema);
// GET
export async function GET() {
  try {
    await connectDB();

    const rashifals = await Rashifal.find().sort({
      _id: -1,
    });

    return Response.json(rashifals);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch Rashifal" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.zodiac || !body.content?.trim()) {
      return Response.json(
        { error: "Zodiac and content are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Rashifal.findOne({
      zodiac: body.zodiac,
    }).sort({ date: -1, _id: -1 });

    if (existing) {
      existing.content = body.content.trim();
      existing.date = new Date();
      existing.bengaliDate = body.bengaliDate?.trim() || "";

      await existing.save();

      return Response.json(existing);
    }

    const rashifal = await Rashifal.create({
      zodiac: body.zodiac,
      content: body.content.trim(),
      image: "",
      date: new Date(),
      bengaliDate: body.bengaliDate?.trim() || "",
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
  try {
    const { id } = await req.json();

    await connectDB();
    await Rashifal.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete Rashifal" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const updated = await Rashifal.findByIdAndUpdate(
      body.id,
      {
        zodiac: body.zodiac,
        content: body.content,
        ...(body.bengaliDate !== undefined && {
          bengaliDate: body.bengaliDate.trim(),
        }),
      },
      { new: true, runValidators: true }
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